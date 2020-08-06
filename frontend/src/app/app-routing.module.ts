import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {BookingComponent} from './components/booking/booking.component';
import {ResturantdetailsComponent} from './components/resturantdetails/resturantdetails.component';

const routes: Routes = [
  { path: 'heroes', component: HomeComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'resturant', component: ResturantdetailsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
