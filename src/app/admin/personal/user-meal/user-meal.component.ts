import { Component, OnInit } from '@angular/core';
import { HrMealMngService } from '../../hr/hr-meal-mng/services/hr-meal-mng.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-meal',
  templateUrl: './user-meal.component.html',
  styleUrls: ['./user-meal.component.scss']
})
export class UserMealComponent implements OnInit {

  constructor(private hrMealMngSvc: HrMealMngService, private toastr: ToastrService, private jwtHelperSvc: JwtHelperService) { }

  mealRecords: any;
  mealRecordsSummary: any;
  searchParams = {
    timeLogRange: [new Date(), new Date()],
    empCode: null
  }

  ngOnInit(): void {
    let empCode = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    let date = new Date();
    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.searchParams.timeLogRange = [firstDayOfMonth, new Date()]
    this.searchParams.empCode = empCode;


    this.onSearch()
  }

  onSearch() {

    console.log(this.searchParams.timeLogRange.length)

    if(this.searchParams.timeLogRange.length == 0) {
      this.toastr.warning('Cần chọn Time Log', 'Warning');
      return
    }

    this.hrMealMngSvc.getMealRecords(this.searchParams).subscribe(
      response => {
        console.log(this.mealRecords)
        this.mealRecords = response.records
        this.mealRecordsSummary = response.recordsSummary
      }
    )
  }

}
