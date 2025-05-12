import { Component } from '@angular/core';

@Component({
  selector: 'app-is-dv-mng-ivt-req-detail',
  templateUrl: './is-dv-mng-ivt-req-detail.component.html',
  styleUrls: ['./is-dv-mng-ivt-req-detail.component.scss']
})
export class IsDvMngIvtReqDetailComponent {

  requestNo: any
  isOpenScanInventoryModal:boolean = false;

  openScanInventoryModal() {
    this.isOpenScanInventoryModal = true;
  }

  getDevice() {
    console.log();
  }
}
