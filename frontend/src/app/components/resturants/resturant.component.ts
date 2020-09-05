import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {Resturant} from '../../models/resturants';
import { NgxSpinnerService } from 'ngx-spinner';
import {BookingComponent} from '../booking/booking.component';
import {ResturantdetailsComponent} from '../resturantdetails/resturantdetails.component';
import { AddResturantComponent } from '../add-resturant/add-resturant.component';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { UIStateService } from '../../services/ui.state.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './resturant.component.html',
  styleUrls: ['./resturant.component.scss']
})
export class ResturantsComponent implements OnInit {
  public restruants:Array<Resturant>;
  public isLogedIn:boolean;
  public userDetails:User;
  public name:string;
   // Inject router to navigate to diffrent pages,spinner for loading,api servide to make http call,userSateService for making http API call
  // Activate route to get the order menuitem details and dialog to control the close of the dialof
  constructor(private spinner: NgxSpinnerService,private dialog: MatDialog,private toastr: ToastrService,
              private _apiService:ApiService,private _uiStateService:UIStateService) { }
  ngOnInit(): void {
    this._uiStateService.castLogedIn.subscribe(value=>this.isLogedIn=value);
    this._uiStateService.castUser.subscribe(value=>this.userDetails=value);
    this.restruants=[];
    this.enumerateResturants();
    this.name='';
    this.spinner.show();
  }


  // Method to fetch all restuarnts to be diaplayed
  public enumerateResturants(){
      this._apiService.getAll('api/resturant')
      .subscribe(response=>{
        this.restruants=response;
        this.spinner.hide();
      },error=>{
        this.spinner.hide();
      })
  }

  // Method to open Booking dialog in the resturnat screen after the user is logedin successfully
  booking(resturant){
    if(this.isLogedIn){
      if(this.userDetails.role!=='Admin'){
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {resturant};
          const dialogRef = this.dialog.open(BookingComponent,dialogConfig);
          dialogRef.componentInstance.booked.subscribe(response=>{
            dialogRef.close();
          })
          dialogRef.afterClosed().subscribe(
              val => console.log("Dialog output:", val)
          );
      }
    } else{
      this.openLoginDialog();
    }
  }

    // Method to open sigin dialog in the resturnat screen if user tries to book withour login
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

    // Method to open signup dialog in the resturnat screen if user tries to book withour login
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


  // Method to open add resturant dialog
  addResturant(argResturant=null){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {resturant:argResturant};
    const dialogRef = this.dialog.open(AddResturantComponent,dialogConfig);
    dialogRef.componentInstance.save.subscribe(val =>{ 
      this.createNewResturant(val);
      dialogRef.close();
    }),
    dialogRef.componentInstance.update.subscribe(val =>{ 
      this.updateResturant(val);
      dialogRef.close();
    }),
    dialogRef.afterClosed().subscribe(
        val => console.log("Dialog output:", val)
    );
  }

  // Method to make api call to create new resturant
  createNewResturant(argValue){
    this.spinner.show();
    this._apiService.post('api/resturant',argValue)
    .subscribe(response=>{
      this.enumerateResturants();
      this.toastr.success(`Successfully add ${argValue.name} Resturant`);
    },error=>{
      this.spinner.hide();
    })
  }

  // Method to make api call to update resturant
  public updateResturant(argValue){
    this.spinner.show();
    this._apiService.update('api/resturant',argValue,argValue._id)
    .subscribe(response=>{
      this.enumerateResturants();
      this.toastr.success(`Successfully updated ${argValue.name} Resturant`);
    },error=>{
      this.spinner.hide();
    })
  }

  // show more dialog function
  showMore(resturant){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {resturant};
    const dialogRef = this.dialog.open(ResturantdetailsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
        val => console.log("Dialog output:", val)
    );
  }

  // Method to delete Resturant for admin user
  deleteResturant(argResturant){
    this.spinner.show();
    this._apiService.delete('api/resturant',argResturant._id)
    .subscribe(response=>{
      this.enumerateResturants();
      this.spinner.hide();
    },error=>{
      this.spinner.hide();
    })
  }

}
