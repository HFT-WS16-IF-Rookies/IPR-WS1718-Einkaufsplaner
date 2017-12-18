import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdSettingsComponent } from './household-settings.component';

describe('HouseholdSettingsComponent', () => {
  let component: HouseholdSettingsComponent;
  let fixture: ComponentFixture<HouseholdSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
