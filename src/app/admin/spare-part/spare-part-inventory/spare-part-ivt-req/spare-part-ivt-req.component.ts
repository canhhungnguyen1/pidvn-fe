import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { SparePartIvtService } from '../../services/spare-part-ivt.service';
@Component({
  selector: 'app-spare-part-ivt-req',
  templateUrl: './spare-part-ivt-req.component.html',
  styleUrls: ['./spare-part-ivt-req.component.scss'],
})
export class SparePartIvtReqComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private sparePartIvtSvc: SparePartIvtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );

    this.getInventoryRequests();
  }


  jwt: any;
  isLoading: boolean = false
  isOpenCreateRequestInventoryModal: boolean = false;
  inventoryRequests: any; // danh sách các request
  ivtReq:any = {};



  openCreateRequestInventoryModal() {
    this.ivtReq = {}

    let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    this.ivtReq.reqNo = `IVT-${currentDate}`;
    this.ivtReq.createdBy = this.jwt.Username
    this.ivtReq.createdByName = this.jwt.FullName
    this.isOpenCreateRequestInventoryModal = true;
  }


  getInventoryRequests() {
    this.sparePartIvtSvc.getInventoryRequests().subscribe(
      response => {
        this.inventoryRequests = response.result.reverse()
      }
    )
  }

  createInventoryRequest() {

    this.isLoading = true
    
    let obj = {
      reqNo: this.ivtReq.reqNo,
      createdBy: this.ivtReq.createdBy,
      remark: this.ivtReq.remark,
      inventoryCloseDate: this.ivtReq.inventoryCloseDate,
    };
  
    console.log('createInventoryRequest: ', obj);
    
  
    this.sparePartIvtSvc.createInventoryRequest(obj).subscribe(
      response => {
        this.isLoading = false
        this.isOpenCreateRequestInventoryModal = false
      },
      error => {
        this.isLoading = false
        this.isOpenCreateRequestInventoryModal = false
      }
    )

  }

  redirectDetail(item: any) {
    console.log(item.data);
    this.router.navigate(
      [`admin/spare-part/spare-part-inventory-request`, `${item.data.id}`],
      { queryParams: { reqNo: item.data.reqNo } }
    );
  }
}
