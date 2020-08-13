import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UIStateService } from '../../services/ui.state.service';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidebarToggle=new EventEmitter();
  public isLogedIn:boolean;
  public userDetails:User;
  constructor(public dialog: MatDialog,private _uiStateService:UIStateService) {}

  ngOnInit(): void {
    this._uiStateService.castLogedIn.subscribe(value=>this.isLogedIn=value);
    this._uiStateService.castUser.subscribe(value=>this.userDetails=value);
  }

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

  closeDialog() {
      this.dialog.closeAll();
  }

  openSignupDialog(){
        let dialogWidth="50vw";
        if(window.innerWidth <= 800){
          dialogWidth="80vw";
        }
        const dialogRef = this.dialog.open(SignupComponent,{width:dialogWidth,panelClass:"my-custom-dialog-class"});
        dialogRef.componentInstance.signin.subscribe(data=>{
            this.openDialog();
            dialogRef.close();
        })
        dialogRef.componentInstance.close.subscribe(data=>{
          dialogRef.close();
        })
  }


  public onToggleSideNav(){
    this.sidebarToggle.emit();
  }

  public logoutUser(){
    localStorage.clear();
    this._uiStateService.getUserDetails();
  }

}
