import { Component, OnInit,EventEmitter,Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from 'src/app/services/api.service';
import { MenuItem } from 'src/app/models/menuItem';


@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss']
})
// common component for create and edit Menu item 
// while create menuItem is passed as null
// while edit menuItem is passed as parameter in the dialog
export class AddMenuItemComponent implements OnInit {
  public form:FormGroup;
  onAdd = new EventEmitter();
  update = new EventEmitter();
  public listOfResturants=[];
  public menuItem:MenuItem;
  // inject service like dialog,formbuilder for form, api service for http call
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddMenuItemComponent>,
    @Inject(MAT_DIALOG_DATA) {menuItem},private cd: ChangeDetectorRef,private _apiService:ApiService) { 
      this.menuItem=menuItem;
    }

  ngOnInit(): void {
    // Initialize form if eidt Menuitem with menuitemValue
    if(this.menuItem){
      this.listOfResturants=[];
      this.form= this.formBuilder.group({
        name: [this.menuItem.name, [Validators.required]],
        image: [this.menuItem.image, Validators.required],
        resturant:[this.menuItem.resturant,[Validators.required]],
        description: [this.menuItem.description, [Validators.required]],
        price:[this.menuItem.price, [Validators.required]],
      });
    } else{
      // initialize form with default values
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

  /**
   * Function to get all restruants
   */
  public enumerateResturants(){
      this._apiService.getAll('api/resturant')
      .subscribe(response=>{
        this.listOfResturants=response;
      },error=>{
        console.log(error);
      })
  }


  /**
   * Function to save or edit menuitem
   */
  proceedtoSave(){
    console.log(this.form);
    if(this.menuItem){
      const updateValue={...this.form.value,_id:this.menuItem._id};
      this.update.emit(updateValue);
    } else{
      this.onAdd.emit(this.form.value);
    }
   
  }


  /**
   * close dialog function
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * function which handles when user selects a file of png/jpg file
   * @param event : FileEvent
   */
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


  /**
   * function to remove image from the form when user clicks on remove image
   */
  public resetImage(){
    this.form.patchValue({
      image: ''
   });
  }

}
