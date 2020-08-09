import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResturantsComponent} from './components/resturants/resturant.component';

import { OrdersComponent } from './components/orders/orders.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { UserbookingsComponent } from './components/userbookings/userbookings.component';
import { UserordersComponent } from './components/userorders/userorders.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path: 'resturant', component: ResturantsComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'order', component: OrdersComponent },
  { path: 'orders', component:UserordersComponent },
  { path: 'bookings', component:UserbookingsComponent },
  { path: 'users', component:UsersComponent },
  { path: '**', component: ResturantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
