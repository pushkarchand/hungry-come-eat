import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResturantComponent } from './add-resturant.component';

describe('AddResturantComponent', () => {
  let component: AddResturantComponent;
  let fixture: ComponentFixture<AddResturantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResturantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
