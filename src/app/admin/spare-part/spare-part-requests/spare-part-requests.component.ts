import { Component, OnInit, ViewChild } from '@angular/core';
import { SparePartService } from '../services/spare-part.service';
import { ToastrService } from 'ngx-toastr';
import { SparePartRecordVo } from '../models/SparePartRecordVo';
import { DxDataGridComponent, DxValidatorComponent } from 'devextreme-angular';
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
    private sparePartRequestSvc: SparePartRequestsService
  ) {}

  ngOnInit(): void {
    this.getRequests()
    this.getSpareParts();
    this.getSections();
  }

  
  requests: any;
  isOpenRequestModal: boolean = false;
  isOpenRequestDetailModal: boolean = false
  spareParts!: SparePartRecordVo[];
  sparePartSelectedList: any;  // Danh sách các mã được chọn

  sectionSelected: any; // Bộ phận được chọn
  sections:any; // Danh sách bộ phận yêu cầu hàng

  sparePartsReqDetail: any; // danh sách hàng theo request

  sparePartReqSelected: any;

  getRequests() {
    this.sparePartRequestSvc.getRequests().subscribe(
      response => {
        this.requests = response
      }
    )
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
  getSections() {
    this.sparePartRequestSvc.getSections().subscribe(
      response => {
        this.sections = response
      }
    )
  }

  /**
   * Sự kiện khi click vào từng row
   * @param event
   */
  onSelectionChanged(event: any) {

    /**
     * Check chọn khu vực
     * Nếu chưa chọn thì ko cho click
     */
    if (!this.sectionSelected) {
      this.toastr.warning('Cần chọn khu vực','Warning')
      return
    }
   
    let arr = new Array();

    event.selectedRowsData.forEach((item: any) => {
      let obj = {...item, qty:0, sectionId: this.sectionSelected }
      arr.push(obj)
    });

    this.sparePartSelectedList = arr

    console.log('this.sparePartSelected: ', this.sparePartSelectedList);
    
  }

  async onSaving(event: any) {
    let arr = new Array();

    await event.changes.forEach((item: any) => {
      arr.push(item.key);
    });
    

    /**
     * Xử lý lưu list data
     */

    console.log('onSaving: ', arr);
    

    this.sparePartRequestSvc.createRequest(arr, this.sectionSelected).subscribe(
      response => {
        this.getRequests()
      }
    )


    this.closeRequestModal();
    

    

  }

  onCreateRequest(dataGrid: DxDataGridComponent) {
    console.log('onCreateRequest');
    
    dataGrid.instance.saveEditData();
  }


  /**
   * Đóng Request Modal
   */
  closeRequestModal() {
    this.isOpenRequestModal = false;
    this.sparePartSelectedList = null;
  }


  openRequestDetailModal(item: any) {
    
    this.sparePartReqSelected = item
    
    console.log(this.sparePartReqSelected);
    
    this.sparePartRequestSvc.getRequestDetail(item.data.id).subscribe(
      response => {
        this.sparePartsReqDetail = response
        this.isOpenRequestDetailModal = true
      }
    )
  }

  downloadRequestDetail(event: any) {
    
    this.sparePartRequestSvc.downloadM4M8Request(event.data.id).subscribe(response => {

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `RequestDetail.xlsm`;
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
}
