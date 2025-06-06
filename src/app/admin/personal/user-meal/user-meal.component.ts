import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { HrMealMngService } from '../../hr/hr-meal-mng/services/hr-meal-mng.service';

@Component({
  selector: 'app-user-meal',
  templateUrl: './user-meal.component.html',
  styleUrls: ['./user-meal.component.scss'],
})
export class UserMealComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  timeLogGrid!: DxDataGridComponent;

  constructor(
    private hrMealMngSvc: HrMealMngService,
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  mealRecords: any;
  mealRecordsSummary: any;
  searchParams = {
    dateRange: [new Date(), new Date()],
    empCode: null,
  };

  ngOnInit(): void {
    let empCode = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    let date = new Date();
    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.searchParams.dateRange = [firstDayOfMonth, new Date()];
    this.searchParams.empCode = empCode;

    this.onSearch();
  }

  onSearch() {

    if (this.searchParams.dateRange.length == 0) {
      this.toastr.warning('Cần chọn Date', 'Warning');
      return;
    }

    let name = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).FullName.split(' ').reverse()[0]
    
    this.timeLogGrid?.instance.beginCustomLoading(
      `Bạn ${name} ơi đợi tý nhé!`
    );

    

    this.hrMealMngSvc
      .getMealRecords(this.searchParams)
      .subscribe((response) => {
        console.log(this.mealRecords);
        this.mealRecords = response.records;
        this.mealRecordsSummary = response.recordsSummary;
        this.timeLogGrid.instance.endCustomLoading();
      });
  }
}
