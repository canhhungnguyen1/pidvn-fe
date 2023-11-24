import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PihInventoryService } from '../services/pih-inventory.service';
import { Router } from '@angular/router';
import { differenceInCalendarDays, setHours } from 'date-fns';

@Component({
  selector: 'app-pih-inv-request',
  templateUrl: './pih-inv-request.component.html',
  styleUrls: ['./pih-inv-request.component.scss'],
})
export class PihInvRequestComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private pihInventorySvc: PihInventoryService,
    private router: Router
  ) {}

  jwt: any;

  inventoryRequests: any;

  userLogin = {
    username: '',
    fullName: '',
  };

  ivtReq: any;
  remark: any;
  calculateTheoryDataDate: any;
  inventoryCloseDate: any;
  inventoryType: any;

  ngOnInit(): void {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );

    this.getInventoryRequests();
  }

  isOpenCreateRequestInventoryModal: boolean = false;

  isLoading: boolean = false;
  today = new Date();

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) < 0;

  openCreateRequestInventoryModal() {
    console.log(this.jwt.Username);

    if (this.jwt.Username !== '3012852' && this.jwt.Username !== '3012982') {
      this.toastr.warning(
        'Bạn không có quyền tạo phiếu nhé',
        `${this.jwt.FullName.split(' ').reverse()[0]} ơi !`
      );
      return;
    }

    let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '');

    this.ivtReq = `IVT-${currentDate}`;

    this.isOpenCreateRequestInventoryModal = true;
  }

  closeCreateRequestInventoryModal() {
    this.isOpenCreateRequestInventoryModal = false;
    this.remark = null;
  }

  createInventoryRequest() {
    
    let obj = {
      reqNo: this.ivtReq,
      createdBy: this.jwt.Username,
      remark: this.remark,
      calculateTheoryDataDate: this.calculateTheoryDataDate,
      inventoryCloseDate: this.inventoryCloseDate,
      inventoryType: this.inventoryType
    };

    let name = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).FullName.split(' ').reverse()[0]

    if (!obj.inventoryType || !obj.calculateTheoryDataDate || !obj.inventoryCloseDate) {
      this.toastr.warning('Cần nhập các trường bắt buộc nhé',`Bạn ${name} ơi!`)
      return;
    }   
    
    this.isLoading = true;

    this.pihInventorySvc.createInventoryRequest(obj).subscribe(
      (response) => {
        this.isOpenCreateRequestInventoryModal = false;
        this.isLoading = false;
        this.getInventoryRequests();
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  getInventoryRequests() {
    this.pihInventorySvc.getInventoryRequests().subscribe((response) => {
      this.inventoryRequests = response;
    });
  }

  redirectDetail(item: any) {
    console.log(item.data);
    this.router.navigate(
      [`admin/pih/pih-inventory/request`, `${item.data.id}`],
      { queryParams: { reqNo: item.data.reqNo } }
    );
  }
}
