import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UIStateService } from 'src/app/services/ui.state.service';
import { ApiService } from 'src/app/services/api.service';
import {UserDetails } from 'src/app/models/user';
import { EdituserComponent } from '../edituser/edituser.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[];
  dataSource:Array<UserDetails>;
  isLoading:boolean;

  constructor(private router: Router,private spinner: NgxSpinnerService,private dialog: MatDialog,
    private _apiService:ApiService,private _uiStateService:UIStateService) { }
  ngOnInit() {
    this.dataSource=[];
    this.isLoading=true;
    this.spinner.show();
    this.enumerateUsers();
  }

  public enumerateUsers(){
    this._apiService.getAll('api/users')
    .subscribe(response=>{
        this.dataSource=response;
        this.isLoading=false;
        this.spinner.hide();
    },(error)=>this.isLoading=false)
  }

  public editUser(argUser){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {user:argUser};
    const dialogRef = this.dialog.open(EdituserComponent,dialogConfig);
    dialogRef.componentInstance.success.subscribe(response=>{
      dialogRef.close();
      this.spinner.show();
      this.enumerateUsers();
    })
  }
}
