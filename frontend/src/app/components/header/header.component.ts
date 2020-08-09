import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {UIStateService} from '../../services/ui.sstate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidebarToggle=new EventEmitter();
  constructor(private _uiStateService:UIStateService) { }

  ngOnInit(): void {
  }

  public openDialog(){
    this._uiStateService.editLogedIn(true);
  }

  public onToggleSideNav(){
    this.sidebarToggle.emit();
  }

}
