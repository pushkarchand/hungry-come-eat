import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import { LoginComponent } from './components/login/login.component';
import { ResturantdetailsComponent } from './components/resturantdetails/resturantdetails.component';
import { BookingComponent } from './components/booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ResturantdetailsComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
