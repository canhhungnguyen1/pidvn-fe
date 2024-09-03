import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { SignaturePad } from 'angular2-signaturepad';
import { ToastrService } from 'ngx-toastr';
import { DeviceManagementService } from '../device-management.service';

@Component({
  selector: 'app-dm-device-list',
  templateUrl: './dm-device-list.component.html',
  styleUrls: ['./dm-device-list.component.scss'],
})
export class DmDeviceListComponent implements OnInit {
  // @ViewChild(SignaturePad) signaturePad!: SignaturePad;

  signaturePadOptions = {
    minWidth: 1,
    penColor: '#1e4161',
    backgroundColor: 'rgb(255, 255, 255 )'
  };

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private deviceMngSvc: DeviceManagementService
  ) {}

  users!: any;
  isOpenAddNewForm: boolean = false;
  isOpenHandOverForm: boolean = false;
  isOpenReceiveForm: boolean = false;
  devices!: any[];
  deviceTypes!: any[];
  deviceStatuses!: any[];

  searchVo: any = {
    deviceType: null,
    mngCode: null,
    model: null,
    serial: null,
    imei: null,
    status: null,
  };

  addNewForm!: UntypedFormGroup;

  inputValue: string | null = null;

  deviceSelected: any;

  ngOnInit(): void {
    this.getUsers();
    this.getDevices(this.searchVo);
    this.getDeviceType();
    this.getDeviceStatus();

    this.addNewForm = this.fb.group({
      mngCode: [null, [Validators.required]],
      deviceType: [null],
      model: [null],
      serial: [null],
      brand: [null],
      imei: [null],
    });
  }

  getUsers() {
    this.deviceMngSvc.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  getDevices(searchVo: any) {
    this.deviceMngSvc.getDevices(searchVo).subscribe((response) => {
      this.devices = response;
      console.log(this.devices);
    });
  }

  getDeviceType() {
    this.deviceMngSvc.getDeviceType().subscribe((response) => {
      this.deviceTypes = response;
      console.log(this.deviceTypes);
    });
  }

  getDeviceStatus() {
    this.deviceMngSvc.getDeviceStatus().subscribe((response) => {
      this.deviceStatuses = response;
    });
  }

  searchDevice() {
    this.getDevices(this.searchVo);
  }

  addDevice() {
    this.submitAddNewForm();
  }

  submitAddNewForm() {
    for (const i in this.addNewForm.controls) {
      if (this.addNewForm.controls.hasOwnProperty(i)) {
        this.addNewForm.controls[i].markAsDirty();
        this.addNewForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.addNewForm.valid) {
      return;
    }

    this.deviceMngSvc
      .createDevice(this.addNewForm.value)
      .subscribe((response) => {
        this.toastr.success('Success !');
        this.getDevices(this.searchVo);
        this.isOpenAddNewForm = false;
        this.resetForm();
      });
  }

  resetForm(): void {
    this.addNewForm.reset();
    for (const key in this.addNewForm.controls) {
      if (this.addNewForm.controls.hasOwnProperty(key)) {
        this.addNewForm.controls[key].markAsPristine();
        this.addNewForm.controls[key].updateValueAndValidity();
      }
    }
    this.isOpenAddNewForm = false;
  }

  handOverDevice() {
    if (!this.deviceSelected.employee) {
      this.toastr.warning('Nhập ID người nhận');
      return;
    }

    // const signature = this.signaturePad.toDataURL('image/png', 0.5);

    // this.deviceSelected.signature = signature

    this.deviceMngSvc
      .handOverDevice(this.deviceSelected)
      .subscribe((response) => {
        this.toastr.success('Success !');
        this.getDevices(this.searchVo);
        this.deviceSelected = null;
        this.isOpenHandOverForm = false;
      });
  }

  openHandOverForm(data: any) {
    this.deviceSelected = data;
    this.isOpenHandOverForm = true;
  }

  receiveDevice() {
    if (!this.deviceSelected.employee) {
      this.toastr.warning('Nhập ID người trả');
      return;
    }

    // const signature = this.signaturePad.toDataURL('image/png', 0.5);

    // this.deviceSelected.signature = signature

    this.deviceMngSvc
      .receiveDevice(this.deviceSelected)
      .subscribe((response) => {
        this.toastr.success('Success !');
        this.getDevices(this.searchVo);
        this.deviceSelected = null;
        this.isOpenReceiveForm = false;
      });
  }

  openReceiveForm(data: any) {
    this.deviceSelected = data;
    this.isOpenReceiveForm = true;
  }

  redirectHistories() {
    this.router.navigate(['admin/is/device-management/histories']);
  }

}
