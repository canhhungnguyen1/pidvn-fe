import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PihInventoryService } from '../services/pih-inventory.service';

@Component({
  selector: 'app-pih-inv-request',
  templateUrl: './pih-inv-request.component.html',
  styleUrls: ['./pih-inv-request.component.scss']
})
export class PihInvRequestComponent implements OnInit {

  constructor (
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private pihInventorySvc: PihInventoryService
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
    let obj = {
      reqNo: this.ivtReq,
      createdBy: this.jwt.Username,
      remark: this.remark
    }

    this.pihInventorySvc.createInventoryRequest(obj).subscribe(
      response => {
        
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

}
