import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Resturant } from '../../models/resturants';

@Component({
  selector: 'app-resturantdetails',
  templateUrl: './resturantdetails.component.html',
  styleUrls: ['./resturantdetails.component.scss']
})
export class ResturantdetailsComponent implements OnInit {
  public resturantDetails:Resturant;
  constructor(private dialogRef: MatDialogRef<ResturantdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) {resturant}) { 
      this.resturantDetails=resturant;
    }  


  ngOnInit(): void {

  }


  close() {
    this.dialogRef.close();
  }
}
