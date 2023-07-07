import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { QaIqcService } from '../services/qa-iqc.service';

@Component({
  selector: 'app-qa-iqc-result-detail',
  templateUrl: './qa-iqc-result-detail.component.html',
  styleUrls: ['./qa-iqc-result-detail.component.scss'],
})
export class QaIqcResultDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private jwtHelperService: JwtHelperService,
    private qaIqcSvc: QaIqcService
  ) {}

  invoice!: string;
  requestNo!: string;
  requestType!: string;
  lotGroup!: string;
  model!: string;
  iqcDataDetails!: any[];
  iqcDataSortingDetails!: any[];

  isOpenDetailModal: boolean = false;
  isOpenMasterModal: boolean = false;
  lotNoSelected: any;
  lotGroupSelected: any;

  ngOnInit(): void {
    this.invoice = this.activatedRoute.snapshot.queryParams['invoice'];
    this.requestNo = this.activatedRoute.snapshot.queryParams['requestNo'];
    this.lotGroup = this.activatedRoute.snapshot.queryParams['lotGroup'];
    this.model = this.activatedRoute.snapshot.queryParams['model'];
    this.requestType = this.activatedRoute.snapshot.queryParams['type'];


    this.getLotGroup();
    this.getIqcDataDetail();
  }

  getIqcDataDetail() {

    if(this.requestType === 'sorting' || this.requestType === 'over6month') {

      this.qaIqcSvc.getIqcDataSortingDetail(this.requestNo, this.lotGroup).subscribe((response) => {
        this.iqcDataSortingDetails = response;

        console.log('iqcDataSortingDetails: ', this.iqcDataSortingDetails)

      });
      return;
    }

    let obj = {
      invoice: this.invoice,
      requestNo: this.requestNo,
      lotGroup: this.lotGroup,
      model: this.model,
    };

    this.qaIqcSvc.getIqcDataDetail(obj).subscribe((response) => {
      this.iqcDataDetails = response;
    });
  }

  getLotGroup() {

    if(this.requestType === 'sorting' || this.requestType === 'over6month') {
      this.qaIqcSvc.getIqcDataSortingMaster(this.requestNo).subscribe(
        response => {
          this.lotGroupSelected = response.find((item:any) => item.lotGroup === this.lotGroup);



          console.log('lotGroupSelected: ', this.lotGroupSelected)
        }
      )

      return
    }


    let obj = {
      invoice: this.invoice,
      requestNo: this.requestNo,
      lotGroup: this.lotGroup,
      model: this.model,
    };
    this.qaIqcSvc.getIqcDataMaster(obj).subscribe((response) => {
      this.lotGroupSelected = response[0];
      console.log('lotGroupSelected: ', this.lotGroupSelected)
    });
  }

  /**
   * Đánh giá từng kiện trong LotGroup
   * @param data
   */
  openLotNoEvaluate(data: any) {
    console.log('Detail: ', data);
    this.lotNoSelected = { ...data };
    this.lotNoSelected.invoice = this.invoice;
    this.lotNoSelected.requestNo = this.requestNo;
    this.isOpenDetailModal = true;
  }

  saveIqcDataDetail() {
    let isNG =
      this.lotNoSelected.result1 == 'NG' ||
      this.lotNoSelected.result2 == 'NG' ||
      this.lotNoSelected.result3 == 'NG' ||
      this.lotNoSelected.result1 == 'CA' ||
      this.lotNoSelected.result2 == 'CA' ||
      this.lotNoSelected.result3 == 'CA';

    if (isNG) {
      if (!this.lotNoSelected.remark) {
        this.toastr.warning('Cần nhập thông tin NG hoặc CA', 'Warning');
        return;
      }
    }

    let createdBy = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    this.lotNoSelected.createdBy = createdBy;


    /**
     * Trường hợp hàng SORTING
     */
    
    if(this.requestType === 'sorting' || this.requestType === 'over6month') {
      console.log(this.lotNoSelected)
      this.qaIqcSvc.saveIqcDataSortingDetail(this.lotNoSelected).subscribe(
        response => {
          this.isOpenDetailModal = false;
          this.getIqcDataDetail();
        }
      )
      



      return
    }

    this.qaIqcSvc
      .saveIqcDataDetail(this.lotNoSelected)
      .subscribe((response) => {
        this.isOpenDetailModal = false;
        this.getIqcDataDetail();
      });
  }

  /**
   * Đánh giá cả LotGroup
   */
  lotGroupEvaluate() {
    this.isOpenMasterModal = true;
  }

  saveIqcDataMaster() {
    console.log('Master: ', this.lotGroupSelected);

    if (
      !this.lotGroupSelected.result1 ||
      !this.lotGroupSelected.result2 ||
      !this.lotGroupSelected.result3
    ) {
      this.toastr.warning('Cần đánh giá đủ GP, Ngoại quan, Kích thước !','Warning')
      return;
    }

    let isNG =
      this.lotGroupSelected.result1 == 'NG' ||
      this.lotGroupSelected.result2 == 'NG' ||
      this.lotGroupSelected.result3 == 'NG' ||
      this.lotGroupSelected.result1 == 'CA' ||
      this.lotGroupSelected.result2 == 'CA' ||
      this.lotGroupSelected.result3 == 'CA';

    if (isNG) {
      if (!this.lotGroupSelected.remark) {
        this.toastr.warning('Cần nhập thông tin NG hoặc CA', 'Warning');
        return;
      }
    }

    let createdBy = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    this.lotGroupSelected.createdBy = createdBy;

    this.lotGroupSelected.invoice = this.invoice;
    this.lotGroupSelected.requestNo = this.requestNo;
    this.lotGroupSelected.lotGroup = this.lotGroup;
    this.lotGroupSelected.model = this.model;



    /**
     * Trường hợp hàng SORTING
     */

    if(this.requestType === 'sorting' || this.requestType === 'over6month') {
      this.qaIqcSvc.saveIqcDataSortingMaster(this.lotGroupSelected).subscribe(
        response => {
          this.toastr.success('Đã lưu !','Success')
          this.isOpenMasterModal = false;
          this.getLotGroup();
        }
      )

      return;
    }


    this.qaIqcSvc
      .saveIqcDataMaster(this.lotGroupSelected)
      .subscribe((response) => {
        this.toastr.success('Đã lưu !','Success')
        this.isOpenMasterModal = false;
        this.getLotGroup();
      });
  }

  /**
   * Xóa dữ liệu detail
   */
  onDelete() {
    if (!this.lotNoSelected.id) {
      this.lotNoSelected.result1 = null;
      this.lotNoSelected.result2 = null;
      this.lotNoSelected.result3 = null;
      this.lotNoSelected.remark = null;
    } else {
      console.log(this.lotNoSelected);

      this.lotNoSelected.result1 = null;
      this.lotNoSelected.result2 = null;
      this.lotNoSelected.result3 = null;
      this.lotNoSelected.remark = null;



      if(this.requestType === 'sorting' || this.requestType === 'over6month') {
        this.qaIqcSvc.deleteIqcDataSortingDetail(this.lotNoSelected.id).subscribe(
          response => {
            this.toastr.success(response.result, 'Success');
            this.getIqcDataDetail();
            this.isOpenDetailModal = false;
          }
        ) 

        return;
      }

      this.qaIqcSvc
        .deleteIqcDataDetail(this.lotNoSelected.id)
        .subscribe((response) => {
          this.toastr.success(response.result, 'Success');
          this.getIqcDataDetail();
          this.isOpenDetailModal = false;
        });
    }
  }


  onDeleteCheckMaster() {
    
  }
}
