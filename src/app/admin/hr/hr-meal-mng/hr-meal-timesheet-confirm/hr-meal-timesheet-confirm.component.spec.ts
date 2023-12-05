import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMealTimesheetConfirmComponent } from './hr-meal-timesheet-confirm.component';

describe('HrMealTimesheetConfirmComponent', () => {
  let component: HrMealTimesheetConfirmComponent;
  let fixture: ComponentFixture<HrMealTimesheetConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrMealTimesheetConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrMealTimesheetConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
