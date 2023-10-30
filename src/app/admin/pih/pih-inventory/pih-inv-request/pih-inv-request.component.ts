import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PihInventoryService } from '../services/pih-inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pih-inv-request',
  templateUrl: './pih-inv-request.component.html',
  styleUrls: ['./pih-inv-request.component.scss']
})
export class PihInvRequestComponent implements OnInit {

  constructor (
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private pihInventorySvc: PihInventoryService,
    private router: Router
  ) {}

  jwt: any

  inventoryRequests: any;

  userLogin = {
    username: '',
    fullName: ''
  }

  ivtReq: any;
  remark: any;

  ngOnInit(): void {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    )

    this.getInventoryRequests();
  }

  isOpenCreateRequestInventoryModal: boolean = false;

  isLoading: boolean = false;

  openCreateRequestInventoryModal() {

    let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '');

    this.ivtReq = `IVT-${currentDate}`;

    this.isOpenCreateRequestInventoryModal = true

  }

  closeCreateRequestInventoryModal() {
    this.isOpenCreateRequestInventoryModal = false
    this.remark = null
  }


  createInventoryRequest() {
    this.isLoading = true;
    let obj = {
      reqNo: this.ivtReq,
      createdBy: this.jwt.Username,
      remark: this.remark
    }

    this.pihInventorySvc.createInventoryRequest(obj).subscribe(
      response => {
        this.isOpenCreateRequestInventoryModal = false
        this.isLoading = false;
        this.getInventoryRequests();
      },
      error => {
        this.isLoading = false;
      }
    )
  }

  getInventoryRequests() {
    this.pihInventorySvc.getInventoryRequests().subscribe(
      response => {
        this.inventoryRequests = response
      }
    )
  }


  redirectDetail(item: any) {
    console.log(item.data)
    this.router.navigate(
      [`admin/pih/pih-inventory/request`, `${item.data.id}`],
      { queryParams: { reqNo: item.data.reqNo } }
    )
  }

}
