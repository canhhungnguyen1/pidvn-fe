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
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.params['id']);
    this.requestNo = this.activatedRoute.snapshot.queryParamMap.get('reqNo');
    this.getLocations();
  }

  requestNo: any;
  requestId: any;
  isOpenScanInventoryModal: boolean = false;
  device: any;
  isLoading: boolean = false;
  isLoadingSaveInventory: boolean = false;
  locations: any [] = [];

  getLocations() {
    this.isDeviceMngSvc.getLocations().subscribe((res: any) => {
      this.locations = res.result;
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
      this.toastr.warning('Cần scan mã thiết bị','Warning');
      return;
    }

    this.isLoading = true;
    this.isDeviceMngSvc.getDevice(event.target.value).subscribe(
      response => {
        this.device = response.result
        this.isLoading = false;
      },
      error => {
        this.device = null
        this.isLoading = false;
      }
    )
  }

  saveInventoryData() {
    this.isLoadingSaveInventory = true;
    
  }
}
