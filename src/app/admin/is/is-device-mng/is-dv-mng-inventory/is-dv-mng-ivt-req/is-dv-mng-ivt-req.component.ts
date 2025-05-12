import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-is-dv-mng-ivt-req',
  templateUrl: './is-dv-mng-ivt-req.component.html',
  styleUrls: ['./is-dv-mng-ivt-req.component.scss'],
})
export class IsDvMngIvtReqComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );

    this.getInventoryRequests();
  }

  jwt: any;
  isLoading: boolean = false;
  ivtReq: any = {};
  inventoryRequests: any[] = [];
  isOpenCreateRequestInventoryModal: boolean = false;

  getInventoryRequests() {}

  redirectDetail(item: any) {}
}
