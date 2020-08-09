import { Component, OnInit,Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from 'moment';

@Component({
  selector: 'app-add-resturant',
  templateUrl: './add-resturant.component.html',
  styleUrls: ['./add-resturant.component.scss']
})
export class AddResturantComponent implements OnInit {
  public form:FormGroup;
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddResturantComponent>,
    @Inject(MAT_DIALOG_DATA) {resturant},private cd: ChangeDetectorRef) { 
      console.log(resturant);
    }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      name: ['', [Validators.required]],
      file: [null, Validators.required],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  proceedtoSave(){
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
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
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  public resetImage(){
    this.form.patchValue({
      file: ''
   });
  }


}
