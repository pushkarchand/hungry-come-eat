import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantdetailsComponent } from './resturantdetails.component';

describe('ResturantdetailsComponent', () => {
  let component: ResturantdetailsComponent;
  let fixture: ComponentFixture<ResturantdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
