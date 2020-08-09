import { Component, OnInit,EventEmitter,Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.scss']
})
export class AddFoodItemComponent implements OnInit {
  public form:FormGroup;
  onAdd = new EventEmitter();
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddFoodItemComponent>,
    @Inject(MAT_DIALOG_DATA) {menuItem},private cd: ChangeDetectorRef) { 
      console.log(menuItem);
    }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      name: ['', [Validators.required]],
      file: [null, Validators.required],
      resturant:['',[Validators.required]],
      description: ['', [Validators.required]],
      price:[0, [Validators.required]],
    });
  }

  proceedtoSave(){
    this.onAdd.emit(this.form.value);
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
