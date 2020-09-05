import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UIStateService } from 'src/app/services/ui.state.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public isLogedIn:boolean;
  public userDetails:User;
  @Output() public sidebarToggle=new EventEmitter();
  constructor(public dialog: MatDialog,private router: Router,private _uiStateService:UIStateService) { }

  ngOnInit(): void {
    this._uiStateService.castLogedIn.subscribe(value=>this.isLogedIn=value);
    this._uiStateService.castUser.subscribe(value=>this.userDetails=value);
  }

  // Method to open sigin dialog
  openDialog() {
    let dialogWidth="50vw";
    if(window.innerWidth <= 800){
      dialogWidth="80vw";
    }
    const dialogRef = this.dialog.open(LoginComponent,{width:dialogWidth,panelClass:"my-custom-dialog-class"});
    dialogRef.componentInstance.onSigin.subscribe(data=>{
         dialogRef.close();
    })

    dialogRef.componentInstance.onSignup.subscribe(data=>{
        this.openSignupDialog();
        dialogRef.close();
    })
    dialogRef.afterClosed().subscribe(result => {
    });
}

// Method to open sigup dialog
openSignupDialog(){
      let dialogWidth="50vw";
      if(window.innerWidth <= 800){
        dialogWidth="80vw";
      }
      const dialogRef = this.dialog.open(SignupComponent,{width:dialogWidth,panelClass:"my-custom-dialog-class"});
      dialogRef.componentInstance.close.subscribe(data=>{
        dialogRef.close();
      })
}

// common to navigate to diffrent routes
navigate(argPath){
  this.router.navigate([`/${argPath}`]);
}

// Method to logout user and route user to home screen
logout(){
  localStorage.clear();
  this._uiStateService.getUserDetails();
  this.router.navigate(['/']);
}


}
