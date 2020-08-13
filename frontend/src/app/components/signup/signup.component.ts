import { Component, OnInit,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MustMatch} from '../../helper/must-match-validation';
import {UIStateService} from '../../services/ui.state.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loginInvalid:boolean;
  error:string;
  close = new EventEmitter();
  signin = new EventEmitter();
  constructor(private formBuilder: FormBuilder,private _uiStateService:UIStateService,private _apiService:ApiService) { }

  ngOnInit(): void {
    this.loginInvalid=false;
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
  }

  public submitSignUp() {
    if (this.signUpForm.valid) {
      this._apiService.post('api/registeruser',this.signUpForm.value)
      .subscribe(response=>{
        this.loginInvalid=false;
        this.signin.emit('');
      },error=>{
        console.log(error);
      })
    } else{
      this.loginInvalid=true;
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.signUpForm.controls[controlName].hasError(errorName);
 }

 public closeDialog(){
  this.close.emit(false);
}

}
