import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QaOqcService } from '../services/qa-oqc.service';

@Component({
  selector: 'app-qa-oqc-request',
  templateUrl: './qa-oqc-request.component.html',
  styleUrls: ['./qa-oqc-request.component.scss'],
})
export class QaOqcRequestComponent implements OnInit {
  constructor(private router: Router, private qaOqcSvc: QaOqcService) {}

  searchVo: any;

  ngOnInit(): void {
    this.getOqcRequests({});
  }

  oqcRequests: any;

  getOqcRequests(filter: any) {
    this.qaOqcSvc.getOqcRequests(filter).subscribe((response) => {
      this.oqcRequests = response;
    });
  }

  handleRequest(item: any) {
    console.log(item);

    let oqcReqVo = {
      reqNo: item.data.reqNo,
      requestStatusId: 2, // Đang xử lý
    };

    let params = {
      reqNo: item.data.reqNo,
      qaCard: item.data.qaCard,
      requestStatus: item.data.requestStatusId,
    };

    this.qaOqcSvc.updateOqcRequest(oqcReqVo).subscribe((response) => {
      this.router.navigate(['admin/qa/qa-oqc-check/oqc-evaluate'], {
        queryParams: params,
      });
    });
  }

  onRowPrepared(event: any) {
    if (event.rowType === 'data') { 
      if (event.key.judgment === 'NG') {
        event.rowElement.style.backgroundColor = 'red';
          // or
          event.rowElement.classList.add('my-class');
          // to override alternation color
          event.rowElement.className = event.rowElement.className.replace(
            'dx-row-alt',
            ''
          );
      }
    }
  }
}
