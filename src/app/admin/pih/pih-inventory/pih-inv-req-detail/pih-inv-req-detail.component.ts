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
  }

  scanLabel(event: any) {

    this.labelIpt.nativeElement.select();
    


    console.log(event)
    
  }

}
