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

/**
 * Component to create and Edit Resturant
 */
export class AddResturantComponent implements OnInit {
  public form:FormGroup;
  public resturant:Resturant;
  save = new EventEmitter();
  update= new EventEmitter();
  /**
   *  
   * @param formBuilder formservice to build reactive form
   * @param dialogRef    to show component in a dialog box
   * @param resturant    is passed null while create. is passed as selected resturnat while edit of resturant
   * @param cd            ChangeDetection to get change in file input
   */
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddResturantComponent>,
    @Inject(MAT_DIALOG_DATA) {resturant},private cd: ChangeDetectorRef) { 
        this.resturant=resturant;
    }

  ngOnInit(): void {
    // Initalize form based on the resturant passed from parent
    if(this.resturant){
      // Invoked while Edting a resturant so set form values to Restuarnt values
      this.form= this.formBuilder.group({
        name: [this.resturant.name, [Validators.required]],
        image: [this.resturant.image, Validators.required],
        description: [this.resturant.description, [Validators.required]],
        address: [this.resturant.address, [Validators.required]],
        totalSeats:[this.resturant.totalSeats,[Validators.required]]
      });
    } else{
      // Invoked while creating new resturant so set form values to default
      this.form= this.formBuilder.group({
        name: ['', [Validators.required]],
        image: [null, Validators.required],
        description: ['', [Validators.required]],
        address: ['', [Validators.required]],
        totalSeats:[0,[Validators.required]]
      });
    }
  }


  /**
   * Method invoked while clicking submit button to create or edit resturant
   */
  proceedtoSave(){
    if(this.resturant){
      const updateResturantValue={...this.form.value,_id:this.resturant._id};
      this.update.emit(updateResturantValue);
    } else{
      this.save.emit(this.form.value); 
    }
  }


// CLose  dialog when clicked close icon in the header
  close() {
    this.dialogRef.close();
  }

  // Method invoked when user selects a file and set the selected file to form and convert file into base64 format
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

  // Method clicks on the remove image 
  public resetImage(){
    this.form.patchValue({
      image: ''
   });
  }


}
