import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { QaIqcService } from '../services/qa-iqc.service';

@Component({
  selector: 'app-qa-iqc-request',
  templateUrl: './qa-iqc-request.component.html',
  styleUrls: ['./qa-iqc-request.component.scss'],
})
export class QaIqcRequestComponent implements OnInit {
  constructor(private router: Router, private qaIqcSvc: QaIqcService) { }

  // private requestSubscription!: Subscription;

  searchVo: any = {};

  iqcRequests: any;

  ngOnInit(): void {
    // this.requestSubscription = interval(5000).subscribe(
    //   (val) => {
    //     this.getIqcRequests()
    //   });

      this.getIqcRequests()
  }

  onSearch() {
    console.log('SearchVo: ', this.searchVo);
    this.getIqcRequests();
  }

  getIqcRequests() {
    console.log('aaa : ')
    this.qaIqcSvc.getIqcRequests(this.searchVo).subscribe((response) => {
      this.iqcRequests = response;
    });
  }

  redirectResultMaster(data: any) {
    this.router.navigate(['admin/qa/qa-iqc-check/iqc-result-master'], {
      queryParams: { requestNo: data.requestNo, invoice: data.invoice },
    });
  }

  handleRequest(data: any) {
    this.qaIqcSvc.updateIqcRequest(data.requestNo, 2).subscribe(
      response => {
        this.getIqcRequests();
      }
    )
  }

  // Handle date picker
  onChange(result: any): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  onCalendarChange(result: Array<Date | null>): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }
}
