import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResturantsComponent } from './components/resturants/resturant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import { LoginComponent } from './components/login/login.component';
import { ResturantdetailsComponent } from './components/resturantdetails/resturantdetails.component';
import { BookingComponent } from './components/booking/booking.component';
import {UIStateService} from './services/ui.sstate.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddResturantComponent } from './components/add-resturant/add-resturant.component';
import { AddFoodItemComponent } from './components/add-food-item/add-food-item.component';
import { UserordersComponent } from './components/userorders/userorders.component';
import { UserbookingsComponent } from './components/userbookings/userbookings.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ResturantsComponent,
    LoginComponent,
    ResturantdetailsComponent,
    BookingComponent,
    SidebarComponent,
    DeliveryComponent,
    OrdersComponent,
    AddResturantComponent,
    AddFoodItemComponent,
    UserordersComponent,
    UserbookingsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    NgxMaterialTimepickerModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [UIStateService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
