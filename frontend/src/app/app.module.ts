import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { HttpClientModule } from '@angular/common/http';
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
import {UIStateService} from './services/ui.state.service';
import {ApiService} from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddResturantComponent } from './components/add-resturant/add-resturant.component';
import { AddFoodItemComponent } from './components/add-food-item/add-food-item.component';
import { UserordersComponent } from './components/userorders/userorders.component';
import { UserbookingsComponent } from './components/userbookings/userbookings.component';
import { UsersComponent } from './components/users/users.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrderCheckoutComponent } from './components/order-checkout/order-checkout.component';
import {FilterPipe} from './helper/searchPipe';
import { EdituserComponent } from './components/edituser/edituser.component';
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
    UsersComponent,
    SignupComponent,
    OrderCheckoutComponent,
    FilterPipe,
    EdituserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    NgxMaterialTimepickerModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UIStateService,ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
