import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IsDeviceMngService } from '../../services/is-device-mng.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-is-dv-mng-ivt-req-detail',
  templateUrl: './is-dv-mng-ivt-req-detail.component.html',
  styleUrls: ['./is-dv-mng-ivt-req-detail.component.scss'],
})
export class IsDvMngIvtReqDetailComponent implements OnInit {
  @ViewChild('deviceNameIpt') deviceNameIpt!: ElementRef;

  constructor(
    private router: Router,
    private isDeviceMngSvc: IsDeviceMngService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.params['id']);
    this.requestNo = this.activatedRoute.snapshot.queryParamMap.get('reqNo');
    this.getInventoryData();
    this.getLocations();

  }

  requestNo: any;
  requestId: any;
  inventoryData: any[] = [];
  isOpenScanInventoryModal: boolean = false;
  device: any;
  isLoading: boolean = false;
  isLoadingSaveInventory: boolean = false;
  locations: any[] = [];

  getLocations() {
    this.isDeviceMngSvc.getLocations().subscribe((res: any) => {
      this.locations = res.result;
    });
  }

  getInventoryData() {
    this.isDeviceMngSvc
      .getInventoryData(this.requestId)
      .subscribe((response) => {
        this.inventoryData = response.result;
      });
  }

  openScanInventoryModal() {
    this.device = null;
    this.isOpenScanInventoryModal = true;
    setTimeout(() => {
      this.deviceNameIpt.nativeElement.focus();
    }, 500);
  }

  getDevice(event: any) {
    if (!event.target.value) {
      this.toastr.warning('Cần scan mã thiết bị', 'Warning');
      return;
    }

    this.isLoading = true;
    this.isDeviceMngSvc.getDevice(event.target.value).subscribe(
      (response) => {
        this.device = response.result;
        this.isLoading = false;
      },
      (error) => {
        this.device = null;
        this.isLoading = false;
      }
    );
  }

  saveInventoryData() {
    this.isLoadingSaveInventory = true;

    console.log('saveInventoryData', this.device);

    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let obj = {
      ...this.device,
      deviceName: this.device.name,
      requestId: this.requestId,
      createdBy: username,
    };

    this.isDeviceMngSvc.saveInventoryData(obj).subscribe(
      (response) => {
        this.getInventoryData();
        this.isLoadingSaveInventory = false;
        this.toastr.success('Thành công', 'Success');
        this.isOpenScanInventoryModal = false;
      },
      (error) => {
        this.isLoadingSaveInventory = false;
        this.toastr.error('Có lỗi lưu dữ liệu', 'Error');
        this.isOpenScanInventoryModal = false;
      }
    );
  }
}
