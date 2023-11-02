import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { HrMealMngService } from '../services/hr-meal-mng.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-hr-meal-summary',
  templateUrl: './hr-meal-summary.component.html',
  styleUrls: ['./hr-meal-summary.component.scss'],
})
export class HrMealSummaryComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  timeLogGrid!: DxDataGridComponent;

  constructor(
    private hrMealMngSvc: HrMealMngService,
    private toastr: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  mealRecords: any;
  mealRecordsSummary: any;
  searchParams = {
    timeLogRange: [new Date(), new Date()],
    dateRange: [new Date(), new Date()],
  };

  ngOnInit(): void {
    let date = new Date();

    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.searchParams.timeLogRange = [firstDayOfMonth, new Date()];
    this.searchParams.dateRange = [firstDayOfMonth, new Date()];
  }

  ngAfterViewInit() {
    this.onSearch();
  }

  onSearch() {
    if (this.searchParams.dateRange.length == 0) {
      this.toastr.warning('Cần chọn Date', 'Warning');
      return;
    }

    let name = this.jwtHelperService.decodeToken(
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
