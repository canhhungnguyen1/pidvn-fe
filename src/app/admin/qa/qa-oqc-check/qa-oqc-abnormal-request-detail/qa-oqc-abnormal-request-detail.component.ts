import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { RelayDateCodeService } from 'src/app/admin/relay/relay-datecode/relay-datecode.service';
import { QaOqcService } from '../services/qa-oqc.service';

@Component({
  selector: 'app-qa-oqc-abnormal-request-detail',
  templateUrl: './qa-oqc-abnormal-request-detail.component.html',
  styleUrl: './qa-oqc-abnormal-request-detail.component.scss',
})
export class QaOqcAbnormalRequestDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private qaOqcSvc: QaOqcService,
    private relayDateCodeSvc: RelayDateCodeService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reqNo = this.activatedRoute.snapshot.paramMap.get('reqNo');

    console.log('reqNo: ', this.reqNo);
    this.getRequest();
  }

  reqNo: any;
  request: any;
  isAccepted: boolean = false;
  isLoading: boolean = false;
  materialScanned: any;
  isAbnormalRequest: any

  getRequest() {
    let searchVo = {
      reqNo: this.reqNo,
    };
    this.qaOqcSvc.getOqcRequests(searchVo).subscribe((response) => {
      this.request = response[0];
      console.log('getRequest: ', this.request);

      this.isAccepted = this.request.acceptedResult ? true : false;

      this.getMaterialScanned(this.request.qaCard);
    });
  }

  

  getMaterialScanned(qaCard: string) {
    this.relayDateCodeSvc.getMaterialScanned(qaCard).subscribe((response) => {
      this.materialScanned = response;

      this.isAbnormalRequest = this.isAbnormal(this.materialScanned);
    });
  }


  /**
   * Check nếu ko scan đủ nvl => isAbnormal = true
   * @param materialScanned 
   * @returns 
   */
  isAbnormal(materialScanned: any): boolean {
    let isAbnormal = false

    if (!materialScanned.length || materialScanned.length <= 0) {
      return true

    }

    // Kiểm tra nếu chưa scan NVL
    for (let i = 0; i < materialScanned.length; i++) {
      const element = materialScanned[i];
      if (!element.scanQty || element.scanQty <= 0) {
        return true;
      }
    }
    return isAbnormal;
  }

  handleAbnormalRequest() {
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let obj = {
      id: this.request.id,
      reqNo: this.request.reqNo,
      acceptedResult: this.request.acceptedResult,
      specialRemark: this.request.specialRemark,
      acceptedBy: username,
    };

    this.isLoading = true;
    this.qaOqcSvc.handleAbnormalRequest(obj).subscribe(
      (response) => {
        this.toastr.success('Thành công', 'Đã xử lý');
        this.getRequest();
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
}
