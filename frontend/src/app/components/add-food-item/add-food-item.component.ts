import { Component, OnInit,EventEmitter,Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from 'src/app/services/api.service';
import { MenuItem } from 'src/app/models/menuItem';


@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.scss']
})
export class AddFoodItemComponent implements OnInit {
  public form:FormGroup;
  onAdd = new EventEmitter();
  update = new EventEmitter();
  public listOfResturants=[];
  public foodItem:MenuItem;
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddFoodItemComponent>,
    @Inject(MAT_DIALOG_DATA) {menuItem},private cd: ChangeDetectorRef,private _apiService:ApiService) { 
      this.foodItem=menuItem;
    }

  ngOnInit(): void {
    console.log(this.foodItem);
    if(this.foodItem){
      this.listOfResturants=[];
      this.form= this.formBuilder.group({
        name: [this.foodItem.name, [Validators.required]],
        image: [this.foodItem.image, Validators.required],
        resturant:[this.foodItem.resturant,[Validators.required]],
        description: [this.foodItem.description, [Validators.required]],
        price:[this.foodItem.price, [Validators.required]],
      });
    } else{
      this.listOfResturants=[];
      this.form= this.formBuilder.group({
        name: ['', [Validators.required]],
        image: [null, Validators.required],
        resturant:['',[Validators.required]],
        description: ['', [Validators.required]],
        price:[0, [Validators.required]],
      });
    }
  
    this.enumerateResturants();
  }

  public enumerateResturants(){
      this._apiService.getAll('api/resturant')
      .subscribe(response=>{
        this.listOfResturants=response;
      },error=>{
        console.log(error);
      })
  }

  proceedtoSave(){
    console.log(this.form);
    if(this.foodItem){
      const updateValue={...this.form.value,_id:this.foodItem._id};
      this.update.emit(updateValue);
    } else{
      this.onAdd.emit(this.form.value);
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
