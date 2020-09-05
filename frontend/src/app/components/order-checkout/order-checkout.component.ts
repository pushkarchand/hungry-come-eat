import { Component, OnInit,ChangeDetectorRef,Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/menuItem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {
  public order:Order;
  public subtotal:number;
  public success=new EventEmitter();
    // inject Formbuilder to user angular reactiveforn, uistateService to login status
  // APi service to make Http api call &toaster to show message 
  constructor(private dialogRef: MatDialogRef<OrderCheckoutComponent>,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) {order},private cd: ChangeDetectorRef,private _apiService:ApiService) {
        this.order=order;
     }
// get logedInuser details and calculate subtotal
  ngOnInit(): void {
    this.subtotal=0;  
    this.order.orderItems.forEach(element => {
        this.subtotal+=element.count*element.price;
    });
    this.getUserDetailsForDelivery();
  }

  /**
   * Method to make http call to get user details
   */
  public getUserDetailsForDelivery(){
    this._apiService.getById('api/users',this.order.userId)
    .subscribe(response=>{
      this.order.deliveryAddress=response.address;
      this.order.postalcode=response.postalCode;
    },error=>{
      console.log(error);
    })
  }

  // Method to close order checkout dialog
  close() {
    this.dialogRef.close();
  }

  // Methdd to make an http call to place an order
  public placeOrder(){
    this._apiService.post('api/order',this.order)
    .subscribe(response=>{
      this.toastr.success("Sucessfully placed your order");
      this.success.emit('');
    },error=>{

    })
  }

}
