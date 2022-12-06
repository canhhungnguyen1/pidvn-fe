import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { RelayInventoryService } from '../services/relay-inventory.service';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import { differenceInCalendarDays, setHours } from 'date-fns';
@Component({
  selector: 'app-relay-inventory-request',
  templateUrl: './relay-inventory-request.component.html',
  styleUrls: ['./relay-inventory-request.component.scss'],
})
export class RelayInventoryRequestComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private reIvtSvc: RelayInventoryService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  today = new Date();

  requests = [];

  cutOffDate = null;

  isOpenIvtCreateModal: boolean = false;

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) > 0;

  ngOnInit(): void {
    this.getInventoryRequests();
  }

  getInventoryRequests() {
    this.reIvtSvc.getInventoryRequests().subscribe((response) => {
      this.requests = response;
    });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  cancelRequest() {
    this.cutOffDate = null;
    this.isOpenIvtCreateModal = false;
  }

  createRequest() {

    debugger

    let user = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username


    // if (user !== '3012982' && user !== '3013808') {
    //   this.toastr.warning('Bạn không có quyền tạo phiếu kiểm kê','Warning')
    //   return;
    // }

    if (!this.cutOffDate) {
      this.toastr.warning('Cần chọn ngày Cut Off !', 'Warning');
      return;
    }

    let obj = {
      cutOff: this.cutOffDate,
      createdBy: this.jwtHelperSvc.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).Username,
    };

    this.reIvtSvc.createInventoryRequest(obj).subscribe((response) => {
      this.toastr.success('Success !', 'OK');
      this.isOpenIvtCreateModal = false;
      this.getInventoryRequests();
    });
  }
}
