import { Component, OnInit,ChangeDetectorRef,Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/menuItem';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {
  public order:Order;
  public subtotal:number;
  public success=new EventEmitter();
  constructor(private dialogRef: MatDialogRef<OrderCheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) {order},private cd: ChangeDetectorRef,private _apiService:ApiService) {
        this.order=order;
     }

  ngOnInit(): void {
    this.subtotal=0;  
    this.order.orderItems.forEach(element => {
        this.subtotal+=element.count*element.price;
    });
    this.getUserDetailsForDelivery();
  }

  public getUserDetailsForDelivery(){
    this._apiService.getById('api/users',this.order.userId)
    .subscribe(response=>{
      this.order.deliveryAddress=response.address;
      this.order.postalcode=response.postalCode;
    },error=>{
      console.log(error);
    })
  }

  close() {
    this.dialogRef.close();
  }

  public placeOrder(){
    this._apiService.post('api/order',this.order)
    .subscribe(response=>{
      this.success.emit('');
    },error=>{

    })
  }

}
