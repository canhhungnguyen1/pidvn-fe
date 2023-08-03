import { Component, OnInit } from '@angular/core';
import { HrMealMngService } from './services/hr-meal-mng.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hr-meal-mng',
  templateUrl: './hr-meal-mng.component.html',
  styleUrls: ['./hr-meal-mng.component.scss']
})
export class HrMealMngComponent implements OnInit {

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
