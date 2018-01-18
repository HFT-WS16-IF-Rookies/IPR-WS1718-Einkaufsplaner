import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarHouseholdComponent } from './nav-bar-household.component';

describe('NavBarHouseholdComponent', () => {
  let component: NavBarHouseholdComponent;
  let fixture: ComponentFixture<NavBarHouseholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarHouseholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
