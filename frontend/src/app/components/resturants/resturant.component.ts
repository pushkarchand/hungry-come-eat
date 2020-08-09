import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {Resturant} from '../../models/resturants';
import { NgxSpinnerService } from 'ngx-spinner';
import {BookingComponent} from '../booking/booking.component';
import {ResturantdetailsComponent} from '../resturantdetails/resturantdetails.component';
import { AddResturantComponent } from '../add-resturant/add-resturant.component';


@Component({
  selector: 'app-home',
  templateUrl: './resturant.component.html',
  styleUrls: ['./resturant.component.scss']
})
export class ResturantsComponent implements OnInit {
  public restruants:Array<Resturant>;
  constructor(private spinner: NgxSpinnerService,private dialog: MatDialog) { }
  ngOnInit(): void {
    this.enumerateResturants();
    this.spinner.show();
  }

  public enumerateResturants(){
    this.restruants=[];
    const resturant1=new Resturant("Crystal  Jade ","Location","Crystal  Jade ","../../../assets/images/Image-1.png");
    const resturant2=new Resturant("Ding Tai Feng ","Location","Ding Tai Feng","../../../assets/images/Image-2.png");
    const resturant3=new Resturant("Mac Donald Tampiness","Location","Mac Donald Tampiness","../../../assets/images/Image-3.png");
    const resturant4=new Resturant("Pu Tien","Location","Pu Tien","../../../assets/images/Image-4.png");
    setTimeout(()=>{
      this.restruants.push(resturant1,resturant2,resturant3,resturant4,resturant1,resturant2,resturant3,resturant4);
      this.spinner.hide();
    },100);
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

  addResturant(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {resturant:null};
    const dialogRef = this.dialog.open(AddResturantComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
        val => console.log("Dialog output:", val)
    );
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

}
