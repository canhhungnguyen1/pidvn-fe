import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent, DxValidatorComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { SparePartRecordVo } from '../models/SparePartRecordVo';
import { SparePartService } from '../services/spare-part.service';
import { SparePartRequestsService } from './spare-part-requests.service';

@Component({
  selector: 'app-spare-part-requests',
  templateUrl: './spare-part-requests.component.html',
  styleUrls: ['./spare-part-requests.component.scss'],
})
export class SparePartRequestsComponent implements OnInit {
  @ViewChild(DxValidatorComponent, { static: false })
  validator!: DxValidatorComponent;

  @ViewChild(DxDataGridComponent, { static: false })
  orderedGrid!: DxDataGridComponent;

  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private sparePartRequestSvc: SparePartRequestsService,
    private jwtHelperSvc: JwtHelperService,
  ) {

    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
  }

  jwt: any;

  ngOnInit(): void {
    this.getRequests();
    this.getSpareParts();
    this.getSubsections();
  }

  requests: any;
  isOpenRequestModal: boolean = false;
  isOpenRequestDetailModal: boolean = false;
  spareParts!: SparePartRecordVo[];

  subsectionSelected: any; // Bộ phận được chọn
  subsections: any; // Danh sách bộ phận yêu cầu hàng

  factorySelected: any;
  factories: any = [
    { code: 'RE', name: 'RELAY FACTORY' },
    { code: 'EM', name: 'EMC FACTORY' },
    { code: 'PN', name: 'PIH ENC FACTORY' },
    { code: 'PR', name: 'PIH RE FACTORY' },
    { code: 'SP', name: 'SPEAKER' },
    { code: 'TN', name: 'HFC FACTORY' },
    { code: 'HO', name: 'HEAD OFFICE' },
    { code: 'PC', name: 'PCB FACTORY' },
  ];

  sparePartsReqDetail: any; // danh sách hàng theo request
  sparePartReqSelected: any;


  // 2 biến này để hứng dữ liệu order list
  orderListSet: any = new Set();
  orderListArr: any;

  requestDate: any = new Date();
  getRequests() {
    let params = {date: new Date()}
    this.sparePartRequestSvc.getRequests(params).subscribe((response) => {
      this.requests = response;
    });
  }

  openRequestModal() {
    this.isOpenRequestModal = true;
  }

  getSpareParts() {
    this.sparePartSvc.getSpareParts().subscribe((response) => {
      this.spareParts = response;
    });
  }

  /**
   * Lấy ra các khu vực
   */
  getSubsections() {
    this.sparePartRequestSvc.getSubsections().subscribe((response) => {
      this.subsections = response;
    });
  }

  async onSaving(event: any) {
    let arr = new Array();

    await event.changes.forEach((item: any) => {
      arr.push(item.key);
    });

    if (arr.length == 0) {
      this.toastr.warning('Cần chọn part number','Warning')
      return;
    }



    /**
     * Xử lý lưu list data
     */
    console.log('onSaving: ', arr);
    this.sparePartRequestSvc
      .createRequest(arr, this.factorySelected, this.subsectionSelected)
      .subscribe((response) => {
        this.getRequests();
      });

    this.closeRequestModal();
  }

  onCreateRequest(dataGrid: DxDataGridComponent) {
    dataGrid.instance.saveEditData();
  }

  /**
   * Đóng Request Modal
   */
  closeRequestModal() {
    this.isOpenRequestModal = false;
    this.orderListArr = new Array();
    this.orderListSet = new Set();
    this.factorySelected = null;
    this.subsectionSelected = null
  }

  openRequestDetailModal(item: any) {
    this.sparePartReqSelected = item;
    console.log(this.sparePartReqSelected);
    this.sparePartRequestSvc
      .getRequestDetail(item.data.id)
      .subscribe((response) => {
        this.sparePartsReqDetail = response;
        this.isOpenRequestDetailModal = true;
      });
  }

  downloadRequestDetail(event: any) {
    this.sparePartRequestSvc
      .downloadM4M8Request(event.data.id)
      .subscribe((response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `RequestDetail.xlsx`;
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(() => {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  /**
   * Thêm dữ liệu vào request
   * @param item
   */
  addToRequest(item: any) {
    // Check chọn khu vực
    if (!this.factorySelected) {
      this.toastr.warning('Cần chọn khu vực', 'Warning');
      return;
    }
    // Check chọn bộ phận
    if (!this.subsectionSelected) {
      this.toastr.warning('Cần chọn bộ phận', 'Warning');
      return;
    }

    let obj = {
      ...item.data,
      qty: 0,
      factoryCode: this.factorySelected,
      subsectionId: this.subsectionSelected,
    };

    this.orderListSet.add(obj);

    this.orderListArr = Array.from(this.orderListSet);
  }

  /**
   * Xóa bớt các item đã order
   * @param item 
   */
  deleteItemOrderList(item: any) {
    for (let obj of this.orderListSet) {
      if (obj.partNumber === item.data.partNumber) {
        this.orderListSet.delete(obj);
        break;
      }
    }
    this.orderListArr = Array.from(this.orderListSet);
  }

  onChangeRequestDate(event: any) {
    console.log('onChangeRequestDate: ',event );
    
    let params = {date: event}
    this.sparePartRequestSvc.getRequests(params).subscribe((response) => {
      this.requests = response;
    });
    
  }


  deleteRequest() {

    let roles = this.jwt.Roles;

    let userLogin = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username

    

    if (this.sparePartReqSelected.data.amountAct > 0) {
      this.toastr.warning('Không thể xóa request đã xuất hàng !','Warning')
      return
    }


    if (userLogin != this.sparePartReqSelected.data.createdBy) {

      if (!roles.includes('super_admin')) {
        this.toastr.warning('Chỉ người tạo mới có quyền xóa !','Warning')
        return
      }

      this.sparePartRequestSvc.deleteSparePartRequest(this.sparePartReqSelected.data.id).subscribe(
        response => {
          this.isOpenRequestDetailModal = false
          this.getRequests();
        },
        error => {
          this.isOpenRequestDetailModal = false
        }
      )
  
    }

  }
}
