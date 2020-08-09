import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MustMatch} from '../../helper/must-match-validation';
import {UIStateService} from '../../services/ui.sstate.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInvalid:boolean;
  login:boolean;
  LoginForm: FormGroup;
  signUpForm: FormGroup;
  error:string;

 
  constructor(private formBuilder: FormBuilder,private _uiStateService:UIStateService) { }

  ngOnInit(): void {
    this.loginInvalid=false;
    this.LoginForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.signUpForm= this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      postalCode:['', Validators.required],
      // dob:['', Validators.required],
      mobile: ['', Validators.required],
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
    this.login=true;
    this.loginInvalid=false;
  }

  public submitLogin() {
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value);
      this.loginInvalid=false;
    } else{
      this.loginInvalid=true;
    }
  }

  public submitSignUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.loginInvalid=false;
    } else{
      this.loginInvalid=true;
    }
  }

  public signIn(){
    this.login=true;
  }

  public signUp(){
    this.login=false;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.signUpForm.controls[controlName].hasError(errorName);
  }

  public closeDialog(){
      this._uiStateService.editLogedIn(false);
  }

}
