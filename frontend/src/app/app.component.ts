import { Component,OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from './components/login/login.component';
import {UIStateService} from './services/ui.sstate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public dialog: MatDialog,private _uiStateService:UIStateService) {}

  ngOnInit(){
    this._uiStateService.castLogedIn.subscribe((event)=>{
      
      if(event){
        this.openDialog();
      } else{
        this.closeDialog();
      }
    })
  }

  openDialog() {
      let dialogWidth="50vw";
      if(window.innerWidth <= 800){
        dialogWidth="80vw";
      }
    const dialogRef = this.dialog.open(LoginComponent,{width:dialogWidth,panelClass:"my-custom-dialog-class"});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
