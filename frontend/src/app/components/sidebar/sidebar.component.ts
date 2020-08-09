import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {UIStateService} from '../../services/ui.sstate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() public sidebarToggle=new EventEmitter();
  constructor(private _uiStateService:UIStateService) { }

  ngOnInit(): void {
  }

  public openDialog(){
    this.sidebarToggle.emit();
    this._uiStateService.editLogedIn(true);
  }

}
