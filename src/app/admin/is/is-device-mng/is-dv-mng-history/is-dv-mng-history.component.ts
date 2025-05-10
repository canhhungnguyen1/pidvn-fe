import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsDeviceMngService } from '../services/is-device-mng.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-is-dv-mng-history',
  templateUrl: './is-dv-mng-history.component.html',
  styleUrls: ['./is-dv-mng-history.component.scss'],
})
export class IsDvMngHistoryComponent implements OnInit {
  constructor(
    private router: Router,
    private isDeviceMngSvc: IsDeviceMngService,
    private jwtSvc: JwtHelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getDevices();
  }

  devices: any[] = [];
  users: any[] = [];

  recordTypes: any[] = [
    {
      id: 'IN',
      name: 'IN',
    },
    {
      id: 'OUT',
      name: 'OUT',
    },
  ];

  transactions: any[] = [];


  getDevices() {
    this.isDeviceMngSvc.getDevices().subscribe((res: any) => {
      this.devices = res.result;
    });
  }

  getUsers() {
    this.isDeviceMngSvc.getUsers().subscribe((res: any) => {
      this.users = res.result;
    });
  }
}
