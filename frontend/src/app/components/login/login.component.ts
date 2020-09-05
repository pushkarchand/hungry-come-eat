import { Component, OnInit,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MustMatch} from '../../helper/must-match-validation';
import {UIStateService} from '../../services/ui.state.service';
import {ApiService} from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInvalid:boolean;
  isProgress:boolean;
  login:boolean;
  LoginForm: FormGroup;
  onSignup = new EventEmitter();
  onSigin = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder,private _uiStateService:UIStateService,
    private toastr: ToastrService,private _apiService:ApiService) { }

  // Initialize login form to default value
  ngOnInit(): void {
    this.loginInvalid=false;
    this.isProgress=false;
    this.LoginForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Method to signin user
  public submitLogin() {
    if (this.LoginForm.valid && !this.isProgress) {
      this.loginInvalid=false;
      this.isProgress=true;
      this._apiService.post('api/authuser',this.LoginForm.value)
      .subscribe(response=>{
        this.isProgress=false;
        localStorage.setItem("authtoken",response.authToken);
        this._uiStateService.getUserDetails();
        this.toastr.success(`Successfully Logedin`);
        this.onSigin.emit(this.LoginForm.value);
      },(error)=>{
        console.log(error);
        this.loginInvalid=true;
        this.isProgress=false;
      })

    } else{
      this.loginInvalid=true;
    }
  }


// Method to close all dialog
  public closeDialog(){
      this.onSigin.emit(this.LoginForm.value);
  }

  // method to open signup dialog from signin dialog
  userSignup(){
      this.onSignup.emit();
  }

}
