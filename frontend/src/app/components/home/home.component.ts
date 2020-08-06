import { Component, OnInit } from '@angular/core';
import {Resturant} from '../../models/resturants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public restruants:Array<Resturant>;
  constructor() { }

  ngOnInit(): void {
    this.enumerateResturants();
  }

  public enumerateResturants(){
    this.restruants=[];
    const resturant1=new Resturant("Crystal  Jade ","Location","Crystal  Jade ","../../../assets/images/Image-1.png");
    const resturant2=new Resturant("Ding Tai Feng ","Location","Ding Tai Feng","../../../assets/images/Image-2.png");
    const resturant3=new Resturant("Mac Donald Tampiness","Location","Mac Donald Tampiness","../../../assets/images/Image-3.png");
    const resturant4=new Resturant("Pu Tien","Location","Pu Tien","../../../assets/images/Image-4.png");
    this.restruants.push(resturant1,resturant2,resturant3,resturant4,resturant1,resturant2,resturant3,resturant4);
  }

}
