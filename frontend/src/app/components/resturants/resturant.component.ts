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

@Component({
  selector: 'app-home',
  templateUrl: './resturant.component.html',
  styleUrls: ['./resturant.component.scss']
})
export class ResturantsComponent implements OnInit {
  public restruants:Array<Resturant>;
  public isLogedIn:boolean;
  public userDetails:User;
  constructor(private spinner: NgxSpinnerService,private dialog: MatDialog,
              private _apiService:ApiService,private _uiStateService:UIStateService) { }
  ngOnInit(): void {
    this._uiStateService.castLogedIn.subscribe(value=>this.isLogedIn=value);
    this._uiStateService.castUser.subscribe(value=>this.userDetails=value);
    this.restruants=[];
    this.enumerateResturants();
    this.spinner.show();
  }

  public enumerateResturants(){
      this._apiService.getAll('api/resturant')
      .subscribe(response=>{
        this.restruants=response;
        this.spinner.hide();
      },error=>{
        this.spinner.hide();
      })
  }

  booking(resturant){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {resturant};
    const dialogRef = this.dialog.open(BookingComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
        val => console.log("Dialog output:", val)
    );
  }

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

  createNewResturant(argValue){
    this.spinner.show();
    this._apiService.post('api/resturant',argValue)
    .subscribe(response=>{
      this.enumerateResturants();
    },error=>{
      this.spinner.hide();
    })
  }

  public updateResturant(argValue){
    this.spinner.show();
    this._apiService.update('api/resturant',argValue,argValue._id)
    .subscribe(response=>{
      this.enumerateResturants();
    },error=>{
      this.spinner.hide();
    })
  }

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
