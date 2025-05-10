import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { IsDeviceMngService } from '../services/is-device-mng.service';

@Component({
  selector: 'app-is-dv-mng-devices',
  templateUrl: './is-dv-mng-devices.component.html',
  styleUrl: './is-dv-mng-devices.component.scss',
})
export class IsDvMngDevicesComponent implements OnInit {
  constructor(
    private router: Router,
    private isDeviceMngSvc: IsDeviceMngService,
    private jwtSvc: JwtHelperService,
    private toastr: ToastrService
  ) {}

  devices: any[] = [];

  ngOnInit(): void {
    this.isDeviceMngSvc.getDevices().subscribe((response) => {
      this.devices = response.result;
    });
  }
}
