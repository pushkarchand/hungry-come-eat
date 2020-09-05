import { Component, OnInit,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MustMatch} from '../../helper/must-match-validation';
import {UIStateService} from '../../services/ui.state.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loginInvalid:boolean;
  public isProgress:boolean;
  error:string;
  close = new EventEmitter();
  signin = new EventEmitter();
   // Inject router to navigate to diffrent pages,spinner for loading,api servide to make http call,userSateService for making http API call
  // Activate route to get the order menuitem details and dialog to control the close of the dialof
  constructor(private formBuilder: FormBuilder,private _uiStateService:UIStateService,
    private toastr: ToastrService,private _apiService:ApiService) { }

    // Set initial Value for signupform
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
      mobile: ['',[Validators.required,Validators.minLength(10)]],
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  // method to resgister user
  public submitSignUp() {
    if (this.signUpForm.valid) {
      this.isProgress=true;
      this._apiService.post('api/registeruser',this.signUpForm.value)
      .subscribe(response=>{
        this.loginInvalid=false;
        this.isProgress=false;
        this.signin.emit('');
        this.toastr.success(`Successfully Registered`);
      },error=>{
        console.log(error);
        this.isProgress=false;
      })
    } else{
      this.loginInvalid=true;
    }
  }


  public checkError = (controlName: string, errorName: string) => {
    return this.signUpForm.controls[controlName].hasError(errorName);
 }

//  method to close signup doalof by clicking close icon in the dialog
 public closeDialog(){
  this.close.emit(false);
}

}
