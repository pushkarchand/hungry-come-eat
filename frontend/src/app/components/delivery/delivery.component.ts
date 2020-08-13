import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from '@angular/router';
import {MenuItem} from '../../models/menuItem';
import { NgxSpinnerService } from 'ngx-spinner';
import {AddFoodItemComponent} from '../add-food-item/add-food-item.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  public menuItems:Array<MenuItem>;
  constructor(private router: Router,private spinner: NgxSpinnerService,private dialog: MatDialog,private _apiService:ApiService) { }
  ngOnInit(): void {
    this.menuItems=[];
    this.enumerateMenuItems();
    this.spinner.show();
  }

  public enumerateMenuItems(){
      this._apiService.getAll('api/menu')
      .subscribe((response)=>{
        this.menuItems=response;
        this.spinner.hide();
      },(error)=>{
        this.spinner.hide();
      })
  }

  addEditFoodItem(argFoodItem:MenuItem=null){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {menuItem:argFoodItem};
    const dialogRef = this.dialog.open(AddFoodItemComponent,dialogConfig);
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

  updateMenuItem(argFoodItem){
    this.spinner.show();
    this._apiService.update('api/menu',argFoodItem,argFoodItem._id)
    .subscribe(response=>{
      this.enumerateMenuItems();
    },error=>{
      this.spinner.hide();
    })
  }

  createMenuItem(value){
    this.spinner.show();
    this._apiService.post('api/menu',value)
    .subscribe(response=>{
      this.enumerateMenuItems();
    },error=>{
      this.spinner.hide();
    })
  }

  deleteMenu(argItem){
    this.spinner.show();
    this._apiService.delete('api/menu',argItem._id)
    .subscribe(response=>{
      this.enumerateMenuItems();
    },error=>{
      this.spinner.hide();
    })
  }

  public orderNavigate(argItem):void{
      this.router.navigate(['/order/',argItem._id,argItem.resturant]);
  }


}
