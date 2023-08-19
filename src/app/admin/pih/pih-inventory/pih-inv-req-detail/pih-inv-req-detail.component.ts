import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pih-inv-req-detail',
  templateUrl: './pih-inv-req-detail.component.html',
  styleUrls: ['./pih-inv-req-detail.component.scss']
})
export class PihInvReqDetailComponent implements OnInit, AfterViewInit{

  @ViewChild('labelIpt') labelIpt!: ElementRef;

  inventoryData: any
  isOpenScanInventoryModal: boolean = false;

  mapLotsScanned: Map<string, any> = new Map();
  listLotsScanned: Array<any> = new Array();

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  onExportClient($event: any) {

  }

  openScanInventoryModal() {
    this.isOpenScanInventoryModal = true;

    setTimeout(() => {
      this.labelIpt.nativeElement.focus()
    }, 500)

  }

  saveInventoryData() {
    this.isOpenScanInventoryModal = false;

    console.log(this.listLotsScanned)
  }

  scanLabel(event: any) {

    this.labelIpt.nativeElement.select();

    let data = event.target.value.split(';')

    let model = data[0];
    let qty = data[2];
    let lotNo = data[3]

    let obj = {
      lotNo: lotNo,
      model: model,
      qty: qty
    }
    
    
    this.mapLotsScanned.set(lotNo, obj);

    this.listLotsScanned = Array.from(
      this.mapLotsScanned.values()
    ).reverse();

    console.log(this.listLotsScanned)
    
  }

}
