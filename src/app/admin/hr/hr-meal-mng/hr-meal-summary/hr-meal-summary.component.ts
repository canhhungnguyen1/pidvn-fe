import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HrMealMngService } from '../services/hr-meal-mng.service';

@Component({
  selector: 'app-hr-meal-summary',
  templateUrl: './hr-meal-summary.component.html',
  styleUrls: ['./hr-meal-summary.component.scss']
})
export class HrMealSummaryComponent {
  constructor(private hrMealMngSvc: HrMealMngService, private toastr: ToastrService) { }

  mealRecords: any;
  mealRecordsSummary: any;
  searchParams = {
    timeLogRange: [new Date(), new Date()]
  }

  ngOnInit(): void {
    let date = new Date();

    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.searchParams.timeLogRange = [firstDayOfMonth, new Date()]

    

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
