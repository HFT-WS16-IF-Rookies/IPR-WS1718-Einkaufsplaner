import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdArticleManagementComponent } from './household-article-management.component';

describe('HouseholdArticleManagementComponent', () => {
  let component: HouseholdArticleManagementComponent;
  let fixture: ComponentFixture<HouseholdArticleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdArticleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdArticleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
