import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { IqcRequestDto } from '../models/IqcRequestDto';
import { IqcService } from '../services/iqc.service';

@Component({
  selector: 'app-iqc-request',
  templateUrl: './iqc-request.component.html',
  styleUrl: './iqc-request.component.scss',
})
export class IqcRequestComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private iqcSvc: IqcService
  ) {

  }

  iqcRequests!: IqcRequestDto[];


  ngOnInit(): void {
    let firstDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
   
    this.searchParams.dateRange = [firstDayOfMonth, new Date()];

    this.getIqcRequests()
  }

  searchParams = {
    dateRange: [new Date(), new Date()],
  };


  getIqcRequests() {
    this.iqcSvc.getIqcRequests(this.searchParams).subscribe(
      response => {
        this.iqcRequests = response.result
      }
    )
  }
}
