import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() public sidebarToggle=new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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


}
