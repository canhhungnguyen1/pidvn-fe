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
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDevices();
    this.getTransactions();
    this.getUsers();
  }

  devices: any[] = [];
  deviceSelected: any;
  users: any[] = [];

  recordTypes: any[] = [
    {
      id: 'IN',
      name: 'Nhận lại',
    },
    {
      id: 'OUT',
      name: 'Bàn giao',
    },
  ];

  transactions: any[] = [];

  isOpenDeviceDetailModal: boolean = false

  getDevices() {
    this.isDeviceMngSvc.getDevices().subscribe((res: any) => {
      this.devices = res.result;
    });
  }

  getTransactions() {
    this.isDeviceMngSvc.getTransactions().subscribe(
      responsse => {
        this.transactions = responsse.result
      }
    )
  }

  getUsers() {
    this.isDeviceMngSvc.getUsers().subscribe((res: any) => {
      this.users = res.result;
    });
  }

  // Hàm hiển thị custom
  displayDeviceName = (item: any): string => {
    return item ? `(${item.type}) - ${item.name}` : '';
  };

  saveTransaction(event: any): void {
    
    const itUserCode = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken') || ''
    )?.Username;

    const obj = {
      ...event.changes[0].data,
      itUserCode,
      id: null
    };

    this.isDeviceMngSvc.saveTransaction(obj).subscribe(
      response => {
        this.toastr.success('Đã lưu lại lịch sử','Thành công')
        this.getDevices();
        this.getTransactions();
      },
      error => {
        this.getDevices();
        this.getTransactions();
      }
    )
  }


  openDeviceDetailModal(event: any) {
    this.deviceSelected = event
    this.isOpenDeviceDetailModal = true;
    console.log(event);
    
  }
}
