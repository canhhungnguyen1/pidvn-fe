import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { IsDeviceMngService } from '../services/is-device-mng.service';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import saveAs from 'file-saver';

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
    this.getLocations();
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
  locations: any[] = [];

  isOpenDeviceDetailModal: boolean = false;
  selectedRows: any;
  selectedTabIndex = 0;

  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
  }

  goToTab(index: number): void {
    this.selectedTabIndex = index;
  }

  getDevices() {
    this.isDeviceMngSvc.getDevices().subscribe((res: any) => {
      this.devices = res.result;
    });
  }

  getTransactions() {
    this.isDeviceMngSvc.getTransactions().subscribe((responsse) => {
      this.transactions = responsse.result;
    });
  }

  getUsers() {
    this.isDeviceMngSvc.getUsers().subscribe((res: any) => {
      this.users = res.result;
    });
  }

  getLocations() {
    this.isDeviceMngSvc.getLocations().subscribe((res: any) => {
      this.locations = res.result;
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
      date: new Date(),
      id: null,
    };

    this.isDeviceMngSvc.saveTransaction(obj).subscribe(
      (response) => {
        this.toastr.success('Đã lưu lại lịch sử', 'Thành công');
        this.getDevices();
        this.getTransactions();
      },
      (error) => {
        this.getDevices();
        this.getTransactions();
      }
    );
  }

  openDeviceDetailModal(event: any) {
    this.deviceSelected = event;
    this.isOpenDeviceDetailModal = true;
    console.log(event);
  }

  // Style header
  onCellPreparedHistory(e: any) {
    if (e.rowType === 'header') {
      e.cellElement.style.backgroundColor = '#000080'; // Change background color
      e.cellElement.style.color = '#ffffff'; // Change text color for better visibility
      e.cellElement.style.fontWeight = 'bold';
    }
  }

  onExportDevices(event: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Devices');
    exportDataGrid({
      component: event.component,
      worksheet: worksheet,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'Devices.xlsx'
        );
      });
    });
  }

  printLabel() {
    console.log(this.selectedRows)
  }

}
