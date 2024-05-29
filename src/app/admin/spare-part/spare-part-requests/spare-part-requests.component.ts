import { Component, OnInit, ViewChild } from '@angular/core';
import { SparePartService } from '../services/spare-part.service';
import { ToastrService } from 'ngx-toastr';
import { SparePartRecordVo } from '../models/SparePartRecordVo';
import { DxDataGridComponent, DxValidatorComponent } from 'devextreme-angular';

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
    private sparePartSvc: SparePartService
  ) {}

  ngOnInit(): void {
    this.getSpareParts();
  }
  requests: any;
  isOpenRequestModal: boolean = false;

  spareParts!: SparePartRecordVo[];
  sparePartOrdered: any;
  sparePartSelected: any;

  openRequestModal() {
    this.isOpenRequestModal = true;
  }

  getSpareParts() {
    this.sparePartSvc.getSpareParts().subscribe((response) => {
      this.spareParts = response;

      console.log(this.spareParts);
    });
  }

  /**
   * Sự kiện khi click vào từng row
   * @param event
   */
  onSelectionChanged(event: any) {
   
    let arr = new Array();

    
    event.selectedRowsData.forEach((item: any) => {
      let obj = {...item, qty:0 }
      arr.push(obj)
    });

    this.sparePartSelected = arr

    
  }

  async onSaving(event: any) {
    let arr = new Array();

    await event.changes.forEach((item: any) => {
      arr.push(item.key);
    });
    

    /**
     * Xử lý login lưu list data
     */
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
    this.sparePartSelected = null;
  }
}
