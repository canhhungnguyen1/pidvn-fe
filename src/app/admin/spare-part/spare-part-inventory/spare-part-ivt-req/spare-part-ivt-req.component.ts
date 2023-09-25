import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { SparePartService } from '../../services/spare-part.service';

@Component({
  selector: 'app-spare-part-ivt-req',
  templateUrl: './spare-part-ivt-req.component.html',
  styleUrls: ['./spare-part-ivt-req.component.scss']
})
export class SparePartIvtReqComponent {

  constructor (
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private sparePartSvc: SparePartService,
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

    this.sparePartSvc.saveSparePartInventoryRequest(obj).subscribe(
      response => {
        this.getInventoryRequests();
        this.isOpenCreateRequestInventoryModal = false
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    )
  }

  getInventoryRequests() {
    this.sparePartSvc.getSparePartInventoryRequests().subscribe(
      response => {
        this.inventoryRequests = response
      }
    )
  }


  redirectDetail(item: any) {
    console.log(item.data)
    this.router.navigate(
      [`admin/spare-part/spare-part-inventory-request`, `${item.data.id}`],
      { queryParams: { reqNo: item.data.reqNo } }
    )
  }
}
