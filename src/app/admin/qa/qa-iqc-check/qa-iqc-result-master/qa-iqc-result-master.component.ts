import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QaIqcService } from '../services/qa-iqc.service';

@Component({
  selector: 'app-qa-iqc-result-master',
  templateUrl: './qa-iqc-result-master.component.html',
  styleUrls: ['./qa-iqc-result-master.component.scss'],
})
export class QaIqcResultMasterComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private qaIqcSvc: QaIqcService
  ) { }

  invoice!: string;
  requestNo!: string;
  requestType!: string;

  iqcRequest: any;
  iqcDataMasters!: any[];
  iqcDataSortingMasters!: any[];

  isHandeled: boolean = false;
  searchVo: any = {};

  ngOnInit(): void {
    this.invoice = this.activatedRoute.snapshot.queryParams['invoice'];
    this.requestNo = this.activatedRoute.snapshot.queryParams['requestNo'];
    this.requestType = this.activatedRoute.snapshot.queryParams['type'];




    this.getIqcDataMaster();
    this.getIqcRequests();
  }

  onSearch() {
    this.searchVo.invoice = this.invoice
    this.searchVo.requestNo = this.requestNo;

    console.log('SearchVo : ', this.searchVo)
    this.qaIqcSvc.getIqcDataMaster(this.searchVo).subscribe((response) => {
      this.iqcDataMasters = response;
    });
  }

  getIqcRequests() {
    let obj = {
      invoice: this.invoice,
      requestNo: this.requestNo
    }
    this.qaIqcSvc.getIqcRequests(obj).subscribe(
      response => {
        this.iqcRequest = response[0];
        this.isHandeled = this.iqcRequest.status == 3 ? true : false
      }
    )

  }

  getIqcDataMaster() {

    /**
     * Đối với hàng sorting hoặc hàng quá 6 tháng
     */
    if(this.requestType === 'sorting' || this.requestType === 'over6month') {
      this.qaIqcSvc.getIqcDataSortingMaster(this.requestNo).subscribe(
        response => {
          this.iqcDataSortingMasters = response;
        }
      )
      return;
    }

    let obj = {
      invoice: this.invoice,
      requestNo: this.requestNo,
    };

    this.qaIqcSvc.getIqcDataMaster(obj).subscribe((response) => {
      this.iqcDataMasters = response;
    });
    
  }

  redirectDetailData(data: any) {
    this.router.navigate(['admin/qa/qa-iqc-check/iqc-result-detail'], {
      queryParams: {
        requestNo: this.requestNo,
        invoice: this.invoice,
        lotGroup: data.lotGroup,
        model: data.model,
        type: this.requestType
      },
    });
  }

  updateRequest(event: any) {
    console.log('Event: ', event)

    let status = event ? 3 : 2;

    this.qaIqcSvc.updateIqcRequest(this.requestNo, status).subscribe(
      response => {
        this.getIqcRequests();
      }
    )
  }

  exportExcel() {
    this.qaIqcSvc.exportExcel(this.requestNo, this.invoice).subscribe(
      response => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `${this.invoice}.xlsx`;
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );


        setTimeout(() => {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);

      }
    )
  }

  exportPdf() {
    console.log('Export Pdf')
  }
}
