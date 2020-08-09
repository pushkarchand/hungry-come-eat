import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {MenuItem} from '../../models/menuItem';
import { NgxSpinnerService } from 'ngx-spinner';
import {AddFoodItemComponent} from '../add-food-item/add-food-item.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  public menuItems:Array<MenuItem>;
  constructor(private spinner: NgxSpinnerService,private dialog: MatDialog) { }
  ngOnInit(): void {
    this.enumerateMenuItems();
    this.spinner.show();
  }

  public enumerateMenuItems(){
    this.menuItems=[];
    const menuItem1=new MenuItem("Mac Chicken Set Meal",20,"Crystal  Jade ","../../../assets/images/Image-10.png");
    const menuItem2=new MenuItem("Xiao Long pao",10,"Ding Tai Feng","../../../assets/images/Image-11.png");
    const menuItem3=new MenuItem("Roast Duck",12,"Mac Donald Tampiness","../../../assets/images/Image-5.png");
    setTimeout(()=>{
      this.menuItems.push(menuItem1,menuItem2,menuItem3,menuItem1,menuItem2,menuItem3);
      this.spinner.hide();
    },100);
  }

  addEditFoodItem(argFoodItem:MenuItem=null){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {menuItem:argFoodItem};
    const dialogRef = this.dialog.open(AddFoodItemComponent,dialogConfig);
    dialogRef.componentInstance.onAdd.subscribe(
      val =>{ console.log("Dialog Save:", val);
      dialogRef.close();}
    );
    dialogRef.afterClosed().subscribe(
        val => console.log("Dialog output:", val)
    );
  }

}
