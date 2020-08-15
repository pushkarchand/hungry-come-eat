import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Resturant } from 'src/app/models/resturants';
import { ApiService } from 'src/app/services/api.service';
import { UIStateService } from 'src/app/services/ui.state.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public form:FormGroup;
  public resturant:Resturant;
  public booked=new EventEmitter();
  public minDate:Date;
  public maxDate:Date;
  public avaliableSeats:number; 
  public occupiedSeats:number;
  constructor(private formBuilder: FormBuilder,private _apiService:ApiService,private _uiStateService:UIStateService,
    private dialogRef: MatDialogRef<BookingComponent>,@Inject(MAT_DIALOG_DATA) {resturant}) { 
      this.resturant=resturant;
    }

  // Initialize  the form and other variables
  ngOnInit(): void {
    const newDate=new Date();
    this.avaliableSeats=0;
    this.occupiedSeats=0;
    this.minDate=new Date(newDate.getFullYear(),newDate.getMonth(),newDate.getDate());
    this.maxDate=new Date(newDate.getFullYear(),newDate.getMonth()+1,newDate.getDate()-1);
    this.form= this.formBuilder.group({
      userName: ['', [Validators.required]],
      date: [this.minDate, [Validators.required]],
      time:[newDate.getHours()+1, [Validators.required,Validators.min(9),Validators.max(23)]],
      numberofSeats: [1, [Validators.required,Validators.max(this.avaliableSeats)]],
      consideration: [''],
    });
    this.getAvaliableSeats();
    this.form.get("date").valueChanges.subscribe(response=>{
      console.log(response);
        this.getAvaliableSeats(response);
    })
  }

  // Get Total seats occupied in the resturant on the day
  getAvaliableSeats(argDate=null){
    debugger;
    this.occupiedSeats=0;
    const date=new Date(argDate||this.form.value.date);
    this._apiService.getAvailableSeats({resturantId:this.resturant._id,date:date})
    .subscribe(response=>{
      // Based on the response change the form validation
      if(response.length>0){
        this.occupiedSeats=response[0].total;
        this.avaliableSeats=Number(this.resturant.totalSeats)-this.occupiedSeats;
        this.form.controls['numberofSeats'].setValidators([Validators.required,Validators.max(this.avaliableSeats)])
      } else{
        this.form.controls['numberofSeats'].setValidators([Validators.required,Validators.max(this.avaliableSeats)])
        this.avaliableSeats=Number(this.resturant.totalSeats)
      }
    })
  }


  // Make API call to create new Booking
  proceedtoSave(){
    if(this.form.valid){
      this._apiService.post('api/booking',{...this.form.value,resturantId:this.resturant._id,createdAt:new Date(),updateAt:new Date(),userId:this._uiStateService.currentUserValue.id})
      .subscribe(response=>{
          this.booked.emit();
      },error=>{
          this.booked.emit();
      })
    }
  }

 

  close() {
    this.dialogRef.close();
  }

}
