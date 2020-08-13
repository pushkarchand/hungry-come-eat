import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { MenuItem,OrderItem } from 'src/app/models/menuItem';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public foodItemId: string;
  public resturantId:string;
  public foodItem:MenuItem;
  public relatedFoodItems:Array<OrderItem>;
  public orderedItems:Array<OrderItem>;
  public gst:number;
  public deliveryCharges:number;
  public totalCharges:number;
  public gstValue:number;
  constructor(private route: ActivatedRoute,private spinner: NgxSpinnerService,private _apiService:ApiService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.relatedFoodItems=[];
    this.orderedItems=[];
    this.gst=5;
    this.deliveryCharges=4;
    this.totalCharges=0;
    this.gstValue=0;
    this.route.paramMap.subscribe( params => {
      this.foodItemId = params.get('foodItemId');
      this.resturantId = params.get('resturantId');
      this.getFoodItemDetails();
      this.getRelatedFoodItems();
    });
  }

  public getFoodItemDetails(){
        this._apiService.getById('api/menu',this.foodItemId)
        .subscribe(response=>{
          this.foodItem=response;
          this.orderedItems=[{...response,count:1}];
          this.calculateTotalCharges();
          this.spinner.hide();
        },(error)=>{
          this.spinner.hide();
        })
  }

  public getRelatedFoodItems(){
    this._apiService.getById('api/resturantmenu',this.resturantId)
    .subscribe(response=>{
      response.forEach(item=>{
        if(item._id!==this.foodItemId){
          this.relatedFoodItems.push({...item,count:0});
        }
      });
    },(error)=>{
      console.log(error);
    })
  }


  public addItemToOrder(argRelatedFoodItem:OrderItem){
    if(argRelatedFoodItem.count==0){
      // insert relatedfoodItem to OrderList and update count in argRelatedFoodItem
      argRelatedFoodItem.count+=1;
      this.orderedItems.push(argRelatedFoodItem);
    } else if(argRelatedFoodItem.count>0){
      // Update count in 
      argRelatedFoodItem.count+=1;
      console.log(this.orderedItems);
    }
    this.calculateTotalCharges();
  }

  public removeItemFromOrder(argRelatedFoodItem:OrderItem){
    if(argRelatedFoodItem.count==1){
      // Remove relatedfoodItem to OrderList and update count in argRelatedFoodItem
      argRelatedFoodItem.count=0;
      const index=this.orderedItems.indexOf(argRelatedFoodItem);
      this.orderedItems.splice(index,1);
    } else if(argRelatedFoodItem.count>1){
      // Update count in 
      argRelatedFoodItem.count-=1;
      console.log(this.orderedItems);
    }
    this.calculateTotalCharges();
  }

  public calculateTotalCharges(){
      let intermediteValue=0;
      this.orderedItems.forEach(item=>{
        intermediteValue+=item.price*item.count;
      });
      this.gstValue=(5*intermediteValue*0.01);
      this.gstValue.toFixed(2);
      this.totalCharges=this.gstValue+this.deliveryCharges+intermediteValue;
      this.totalCharges.toFixed(2);
  }

}
