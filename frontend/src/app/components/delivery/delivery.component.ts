import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from '@angular/router';
import {MenuItem} from '../../models/menuItem';
import { NgxSpinnerService } from 'ngx-spinner';
import {AddMenuItemComponent} from '../add-menu-item/add-menu-item.component';
import { ApiService } from 'src/app/services/api.service';
import { UIStateService } from 'src/app/services/ui.state.service';
import { User } from 'src/app/models/user';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})

// Delievry component to show diffrent menu items with edit and delete functionality
export class DeliveryComponent implements OnInit {
  public menuItems:Array<MenuItem>;
  isLogedIn:boolean;
  userDetails:User;
  name:string;
  constructor(private router: Router,private spinner: NgxSpinnerService,private dialog: MatDialog,
    private toastr: ToastrService,private _apiService:ApiService,private _uiStateService:UIStateService) { }
  ngOnInit(): void {
    this.name="";
    this._uiStateService.castLogedIn.subscribe(value=>this.isLogedIn=value);
    this._uiStateService.castUser.subscribe(value=>this.userDetails=value);
    this.menuItems=[];
    this.enumerateMenuItems();
    this.spinner.show();
  }

  // Getall MenuItems 
  public enumerateMenuItems(){
      this._apiService.getAll('api/menu')
      .subscribe((response)=>{
        this.menuItems=response;
        this.spinner.hide();
      },(error)=>{
        this.spinner.hide();
      })
  }

  // Open addMenuItem dialog function
  addEditFoodItem(argFoodItem:MenuItem=null){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {menuItem:argFoodItem};
    const dialogRef = this.dialog.open(AddMenuItemComponent,dialogConfig);
    dialogRef.componentInstance.onAdd.subscribe(val =>{ 
      this.createMenuItem(val);
      dialogRef.close();
    }),
    dialogRef.componentInstance.update.subscribe(val =>{ 
      this.updateMenuItem(val);
      dialogRef.close();
    }),
    dialogRef.afterClosed().subscribe(
        val => console.log("Dialog output:", val)
    );
  }


  // Method to make API call to update menuItem
  updateMenuItem(argFoodItem){
    this.spinner.show();
    this._apiService.update('api/menu',argFoodItem,argFoodItem._id)
    .subscribe(response=>{
      this.toastr.success(`Successfully updated ${argFoodItem.name} food item`);
      this.enumerateMenuItems();
    },error=>{
      this.spinner.hide();
    })
  }


  // Method to make API call to create new Menu item
  createMenuItem(value){
    this.spinner.show();
    this._apiService.post('api/menu',value)
    .subscribe(response=>{
      this.toastr.success(`Successfully added ${value.name} food item`);
      this.enumerateMenuItems();
    },error=>{
      this.spinner.hide();
    })
  }

  // Method to delete menu item
  deleteMenu(argItem){
    this.spinner.show();
    this._apiService.delete('api/menu',argItem._id)
    .subscribe(response=>{
      this.enumerateMenuItems();
    },error=>{
      this.spinner.hide();
    })
  }

  // method to order menuitem
  public orderNavigate(argItem):void{
    if(this.isLogedIn){
      if(this.userDetails.role!=='Admin'){
        this.router.navigate(['/order/',argItem._id,argItem.resturant]);
      }
    } else{
      this.openLoginDialog();
    }
  }


  // method to show login dialog if user is loged in 
  openLoginDialog() {
    let dialogWidth="50vw";
    if(window.innerWidth <= 800){
      dialogWidth="80vw";
    }
    const dialogRef = this.dialog.open(LoginComponent,{width:dialogWidth,panelClass:"my-custom-dialog-class"});
    dialogRef.componentInstance.onSigin.subscribe(data=>{
        dialogRef.close();
    })

    dialogRef.componentInstance.onSignup.subscribe(data=>{
        this.openSignupDialog();
        dialogRef.close();
    })
    dialogRef.afterClosed().subscribe(result => {
    });
}

// Internal method to show signup dialog in delivery component
openSignupDialog(){
    let dialogWidth="50vw";
    if(window.innerWidth <= 800){
      dialogWidth="80vw";
    }
    const dialogRef = this.dialog.open(SignupComponent,{width:dialogWidth,panelClass:"my-custom-dialog-class"});
    dialogRef.componentInstance.signin.subscribe(data=>{
        this.openLoginDialog();
        dialogRef.close();
    })
    dialogRef.componentInstance.close.subscribe(data=>{
      dialogRef.close();
    })
}


}
