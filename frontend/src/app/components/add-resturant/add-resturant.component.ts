import { Component, OnInit,Inject,EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from 'moment';
import { Resturant } from 'src/app/models/resturants';

@Component({
  selector: 'app-add-resturant',
  templateUrl: './add-resturant.component.html',
  styleUrls: ['./add-resturant.component.scss']
})
export class AddResturantComponent implements OnInit {
  public form:FormGroup;
  public resturant:Resturant;
  save = new EventEmitter();
  update= new EventEmitter();
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddResturantComponent>,
    @Inject(MAT_DIALOG_DATA) {resturant},private cd: ChangeDetectorRef) { 
        this.resturant=resturant;
    }

  ngOnInit(): void {
    if(this.resturant){
      this.form= this.formBuilder.group({
        name: [this.resturant.name, [Validators.required]],
        image: [this.resturant.image, Validators.required],
        description: [this.resturant.description, [Validators.required]],
        address: [this.resturant.address, [Validators.required]],
        totalSeats:[this.resturant.totalSeats,[Validators.required]]
      });
    } else{
      this.form= this.formBuilder.group({
        name: ['', [Validators.required]],
        image: [null, Validators.required],
        description: ['', [Validators.required]],
        address: ['', [Validators.required]],
        totalSeats:[0,[Validators.required]]
      });
    }
  }

  proceedtoSave(){
    if(this.resturant){
      const updateResturantValue={...this.form.value,_id:this.resturant._id};
      this.update.emit(updateResturantValue);
    } else{
      this.save.emit(this.form.value); 
    }
  }

  close() {
    this.dialogRef.close();
  }

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.form.patchValue({
          image: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  public resetImage(){
    this.form.patchValue({
      image: ''
   });
  }


}
