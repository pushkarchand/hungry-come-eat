import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public form:FormGroup;
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<BookingComponent>,
    @Inject(MAT_DIALOG_DATA) {resturant}) { 
      console.log(resturant);
    }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      userName: ['', [Validators.required]],
      date: [moment(), [Validators.required]],
      time:[9, [Validators.required]],
      customercount: [1, [Validators.required]],
      consideration: ['', [Validators.required]],
    });
  }

  proceedtoSave(){
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
