import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from 'src/app/services/api.service';
import { UIStateService } from 'src/app/services/ui.state.service';
import { UserDetails } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  form: FormGroup;
  loginInvalid:boolean;
  public isProgress:boolean;
  public userDetails:UserDetails;
  error:string;
  close = new EventEmitter();
  success = new EventEmitter();
  // INject APiservice to make http api call, toaster to show messga, dialog to close dialog and form for reactive form
  constructor(private formBuilder: FormBuilder,private _apiService:ApiService,private toastr: ToastrService,
    private dialogRef: MatDialogRef<EdituserComponent>,@Inject(MAT_DIALOG_DATA) {user}) {
        this.userDetails=user;
     }

    //  Initialize form with user details
  ngOnInit(): void {
    this.loginInvalid=false;
    this.form= this.formBuilder.group({
      userName: [this.userDetails.userName, Validators.required],
      firstName: [this.userDetails.firstName, Validators.required],
      role:[this.userDetails.role,Validators.required],
      lastName: [this.userDetails.lastName, Validators.required],
      address: [this.userDetails.address, Validators.required],
      postalCode:[this.userDetails.postalCode, Validators.required],
      mobile: [this.userDetails.mobile, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
  });
  }


  // make API calls to update user
  public editUser() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.isProgress=true;
      this._apiService.update('api/user',this.form.value,this.userDetails._id)
      .subscribe(response=>{
        this.loginInvalid=false;
        this.isProgress=false;
        this.toastr.success(`update user sucessfully`);
        this.success.emit('');
      },error=>{
        this.error=error;
        this.isProgress=false;
      })
    } else{
      this.loginInvalid=true;
    }
  }

// method to close edit user dialog
 public closeDialog(){
  this.dialogRef.close();
}

}
