import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Order } from 'src/app/models/menuItem';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.scss']
})
export class UserordersComponent implements OnInit {
  displayedColumns: string[];
  dataSource:Array<Order>;
  isLoading:boolean;

  constructor(private _apiService:ApiService){}
  ngOnInit() {
    this.dataSource=[];
    this.isLoading=true;
    this.enumerateUsers();
  }

  public enumerateUsers(){
    this._apiService.getAll('api/order')
    .subscribe(response=>{
        this.dataSource=response;
        this.isLoading=false;
    },(error)=>this.isLoading=false)
  }
}