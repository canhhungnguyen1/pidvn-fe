import { Component, OnInit } from '@angular/core';
import { HrMealMngService } from '../services/hr-meal-mng.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-hr-meal-timesheet-confirm',
  templateUrl: './hr-meal-timesheet-confirm.component.html',
  styleUrls: ['./hr-meal-timesheet-confirm.component.scss'],
})
export class HrMealTimesheetConfirmComponent implements OnInit {
  isLoadingTimeSheetConfirm: boolean = false;

  constructor(
    private hrMealMngSvc: HrMealMngService,
    private toastr: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  couponsBalance: any
  date = null;




  isLoading: boolean[] = [false, false, false, false];

  items = [
    {
      label: 'Attendance',
      table: 'attendance',
      isLoading: false
    },
    {
      label: 'OT',
      table: 'overtime',
      isLoading: false
    },
    {
      label: 'MealRecord',
      table: 'meal_record',
      isLoading: false
    },
    {
      label: 'Leave Day',
      table: 'leave_day',
      isLoading: false
    }
  ]

  timesheetConfirm(index: number, item: any): void {
    this.items[index].isLoading = true;
    this.hrMealMngSvc.timesheetConfirm(item.table).subscribe(
      response => {
        console.log('DATA: ', response);
        this.items[index].isLoading = false;
      },
      error => {
        console.error('ERROR: ', error);
        this.items[index].isLoading = false;
      }
    )
  }





  ngOnInit(): void {}

  // timesheetConfirm() {
  //   this.isLoadingTimeSheetConfirm = true;
  //   this.hrMealMngSvc.timesheetConfirm().subscribe(
  //     (response) => {
  //       console.log('DATA: ', response);
  //       this.isLoadingTimeSheetConfirm = false;
  //     },
  //     (error) => {
  //       console.error('ERROR: ', error);
  //       this.isLoadingTimeSheetConfirm = false;
  //     }
  //   );
  // }

  getCouponsBalance() {
    this.hrMealMngSvc.getBalance(this.date).subscribe(
      response => {
        this.couponsBalance = response
      }
    )
  }
}
