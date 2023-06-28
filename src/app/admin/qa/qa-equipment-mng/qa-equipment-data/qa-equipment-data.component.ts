import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QaEquipmentMngService } from '../services/qa-equipment-mng.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-qa-equipment-data',
  templateUrl: './qa-equipment-data.component.html',
  styleUrls: ['./qa-equipment-data.component.scss'],
})
export class QaEquipmentDataComponent implements OnInit {
  constructor(
    private qaEquipmentMngSvc: QaEquipmentMngService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService
  ) {}

  devices: any;

  isOpenEditDeviceModal: boolean = false;
  modalTitle: any;

  deviceSelected: any = {
    controlNo: null,
    equipmentName: null,
    serialNo: null,
    typeNo: null,
    manufacturer: null,
    distributionLocation: null,
    rangeOfMeasuring: null,
    createdAt: null,
    updatedAt: null,
  };

  ngOnInit(): void {
    this.getQaDevices();
  }

  getQaDevices() {
    this.qaEquipmentMngSvc.getQaDevices().subscribe((response) => {
      this.devices = response;
    });
  }

  openEditDeviceModal(item: any) {
    if (!item) {
      this.modalTitle = `Thêm thiết bị`;
      this.isOpenEditDeviceModal = true;

      return;
    }

    this.deviceSelected = { ...item.data };
    this.modalTitle = `Sửa thông tin thiết bị`;
    this.isOpenEditDeviceModal = true;

    console.log(this.deviceSelected);
  }

  handleCancel() {
    this.isOpenEditDeviceModal = false;
  }

  handleOk() {
    this.qaEquipmentMngSvc
      .saveDeviceInfo(this.deviceSelected)
      .subscribe((response) => {
        this.deviceSelected = {
          controlNo: null,
          equipmentName: null,
          serialNo: null,
          typeNo: null,
          manufacturer: null,
          distributionLocation: null,
          rangeOfMeasuring: null,
          createdAt: null,
          updatedAt: null,
        };
        this.isOpenEditDeviceModal = false;
        console.log(this.deviceSelected);
        this.toastr.success('OK','Success')
      });
  }
}
