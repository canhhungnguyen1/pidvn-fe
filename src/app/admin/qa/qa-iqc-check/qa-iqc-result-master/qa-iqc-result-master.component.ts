import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QaIqcService } from '../services/qa-iqc.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-qa-iqc-result-master',
  templateUrl: './qa-iqc-result-master.component.html',
  styleUrls: ['./qa-iqc-result-master.component.scss'],
})
export class QaIqcResultMasterComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private qaIqcSvc: QaIqcService,
    private jwtHelperSvc: JwtHelperService
  ) { }

  

  invoice!: string;
  requestNo!: string;
  requestType!: string;
  goodsType!: string

  iqcRequest: any;
  iqcDataMasters!: any[];
  iqcDataSortingMasters!: any[];

  isHandeled: boolean = false;
  searchVo: any = {};

  ngOnInit(): void {
    this.invoice = this.activatedRoute.snapshot.queryParams['invoice'];
    this.requestNo = this.activatedRoute.snapshot.queryParams['requestNo'];
    this.requestType = this.activatedRoute.snapshot.queryParams['type'];
    this.goodsType = this.activatedRoute.snapshot.queryParams['goodsType'];

    this.getIqcDataMaster();
    this.getIqcRequests();
    this.getLevelOfControls();

    
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

  iqc6Month: any

  getIqcDataMaster() {
    /**
     * Đối với hàng sorting hoặc hàng quá 6 tháng
     */
    if(this.requestType === 'sorting' || this.requestType === '6Month') {
      this.qaIqcSvc.getLotIqcOver6Month(this.requestNo, this.goodsType).subscribe(
        response => {
          this.iqc6Month = response.result
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



  

  selectedRows: any;
  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
  }


  openModalDanhGiaLotNo(goodsType: string) {
    console.log('this.selectedRows: ', this.selectedRows);
    
    console.log('Đánh giá hàng: ', this.goodsType);


    if (goodsType === 'OUTSIDE') {
      this.isOpen6MonthModal = true;
    }

    
  }


  getLevelOfControls() {
    this.qaIqcSvc.getIqcLevelOfControl().subscribe(
      response => {
        this.levelOfControls = response
      }
    )
  }

  levelOfControls: any
  isOpen6MonthModal: boolean = false

  evaluate: any = {}

  saveDanhGiaIqc6Month() {
    console.log('saveDanhGiaIqc6Month: ',this.selectedRows);
    console.log('evaluate: ', this.evaluate);

    let createdBy = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;


    for (let item of this.selectedRows) {
      item.createdBy = createdBy;
      item.result1 = this.evaluate.gp
      item.result2 = this.evaluate.ngoaiQuan
      item.result3 = this.evaluate.kichThuoc
      item.remark = this.evaluate.remark
      item.levelOfControlNgoaiQuan = this.evaluate.levelOfControlNgoaiQuan
      item.levelOfControlKichThuoc = this.evaluate.levelOfControlKichThuoc
    }
  

    this.qaIqcSvc.saveIqcResult(this.selectedRows, this.goodsType).subscribe(
      response => {
        this.getIqcDataMaster()
        this.isOpen6MonthModal = false;
      }
    )


    

    
  }
}
