import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsDeviceMngService } from '../../services/is-device-mng.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-is-dv-mng-ivt-req-detail',
  templateUrl: './is-dv-mng-ivt-req-detail.component.html',
  styleUrls: ['./is-dv-mng-ivt-req-detail.component.scss'],
})
export class IsDvMngIvtReqDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private isDeviceMngSvc: IsDeviceMngService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  requestNo: any;
  isOpenScanInventoryModal: boolean = false;

  openScanInventoryModal() {
    this.isOpenScanInventoryModal = true;
  }

  getDevice() {
    console.log();
  }
}
