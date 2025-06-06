import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  DxDataGridComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { IsDeviceMngService } from '../services/is-device-mng.service';
import { DeviceDto } from '../models/DeviceDto';

@Component({
  selector: 'app-is-dv-mng-devices',
  templateUrl: './is-dv-mng-devices.component.html',
  styleUrl: './is-dv-mng-devices.component.scss',
})
export class IsDvMngDevicesComponent implements OnInit {
  @ViewChild('devicesGrid') devicesGrid!: DxDataGridComponent;

  @ViewChild(DxValidationGroupComponent, { static: false })
  transactionFormValidator!: DxValidationGroupComponent;

  @ViewChild(DxValidationGroupComponent, { static: false })
  deviceFormValidator!: DxValidationGroupComponent;

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
  today = new Date();
  devices: any[] = [];
  deviceSelected: any;
  users: any[] = [];

  recordTypes: any[] = [
    {
      id: 'IN',
      name: 'Nhận lại (IN)',
    },
    {
      id: 'OUT',
      name: 'Bàn giao (OUT)',
    },
  ];

  transactions: any[] = [];
  locations: any[] = [];

  isOpenTransactionModal: boolean = false;
  isOpenDeviceDetailModal: boolean = false;
  isOpenDeviceCRUDModal: boolean = false;
  titleDeviceCRUDModal!: string;
  selectedRows: any;
  selectedTabIndex = 0;
  transactionSelected: any = {};
  isLoading: boolean = false;

  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
  }

  goToTab(index: number): void {
    this.selectedTabIndex = index;
  }

  getDevices() {
    this.devicesGrid?.instance.beginCustomLoading(`Đang tải dữ liệu ...`);
    this.isDeviceMngSvc.getDevices().subscribe(
      (res: any) => {
        this.devices = res.result;
        this.resetFiltersAndSorting();
        this.devicesGrid.instance.endCustomLoading();
      },
      (error) => {
        this.devicesGrid.instance.endCustomLoading();
      }
    );
  }

  resetFiltersAndSorting() {
    this.devicesGrid.instance.clearFilter();
    this.devicesGrid.instance.clearSorting();
    this.devicesGrid.instance.clearSelection();
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

  saveTransaction() {
    const result = this.transactionFormValidator.instance.validate();
    if (!result.isValid) {
      return;
    }

    this.isLoading = true;

    const itUserCode = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken') || ''
    )?.Username;

    let obj = { ...this.transactionSelected, itUserCode };

    this.isDeviceMngSvc.saveTransaction(obj).subscribe(
      (response) => {
        this.toastr.success('Đã lưu lại lịch sử', 'Thành công');
        this.getDevices();
        this.getTransactions();
        this.isOpenTransactionModal = false;
        this.isLoading = false;
      },
      (error) => {
        this.getDevices();
        this.getTransactions();
        this.isOpenTransactionModal = false;
        this.isLoading = false;
      }
    );
  }

  openDeviceDetailModal(event: any) {
    this.deviceSelected = event;
    this.isOpenDeviceDetailModal = true;
    console.log('openDeviceDetailModal: ', event);
  }

  openTransactionModal(event: any) {
    this.transactionSelected = event;
    this.isOpenTransactionModal = true;
    console.log('openTransactionModal: ', event);
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

  openDeviceCRUDModal(data?: DeviceDto) {
    
    this.deviceSelected = new DeviceDto();
    if (data) {
      this.deviceSelected = {...data};
      this.titleDeviceCRUDModal = `Cập nhật thiết bị: ${data.name}`;
      this.isOpenDeviceCRUDModal = true;
      console.log('openDeviceCRUDModal: ', this.deviceSelected);
      return;
    }
    this.titleDeviceCRUDModal = `Thêm thiết bị mới`;
    this.deviceSelected = new DeviceDto();
    this.deviceSelected.locationCode = 'Office';
    this.deviceSelected.picCode = '1001238'; // Default PIC code
    this.isOpenDeviceCRUDModal = true;


    console.log('openDeviceCRUDModal: ', this.deviceSelected);
    return;
  }

  saveDevice() {
    const result = this.deviceFormValidator.instance.validate();
    if (!result.isValid) {
      this.toastr.warning('Vui lòng kiểm tra lại thông tin', 'Warning');
      return;
    }

    this.isLoading = true;

    if (this.deviceSelected.id) {
      this.updateDevice();
      return;
    }

    this.createDevice();
    return;
  }

  createDevice() {
    console.log('createDevice: ', this.deviceSelected);

    this.isDeviceMngSvc.createDevice(this.deviceSelected).subscribe(
      (response) => {
        this.toastr.success('Đã tạo thiết bị mới', 'Success');
        this.getDevices();
        this.isOpenDeviceCRUDModal = false;
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Lỗi khi tạo thiết bị mới', 'Error');
        this.isLoading = false;
      }
    );

  }

  updateDevice() {
    console.log('updateDevice: ', this.deviceSelected);

    this.isDeviceMngSvc.updateDevice(this.deviceSelected).subscribe(
      (response) => {
        this.toastr.success('Đã cập nhật thông tin', 'Success');
        this.getDevices();
        this.isOpenDeviceCRUDModal = false;
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Lỗi khi cập nhật thông tin', 'Error');
        this.isLoading = false;
      }
    );
  }
}
