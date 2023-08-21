import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PihInventoryService } from '../services/pih-inventory.service';
@Component({
  selector: 'app-pih-inv-req-detail',
  templateUrl: './pih-inv-req-detail.component.html',
  styleUrls: ['./pih-inv-req-detail.component.scss']
})
export class PihInvReqDetailComponent implements OnInit, AfterViewInit{

  @ViewChild('labelIpt') labelIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  requestId: any;
  inventoryData: any
  isOpenScanInventoryModal: boolean = false;

  mapLotsScanned: Map<string, any> = new Map();
  listLotsScanned: Array<any> = new Array();

  lotNoEdit: string | null = null;

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private pihInventorySvc: PihInventoryService
  ) {}

  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.params['id'])
    this.getInventoryData(this.requestId);
  }

  ngAfterViewInit(): void {
    
  }

  getInventoryData(requestId: any) {
    this.pihInventorySvc.getInventoryData(requestId).subscribe(
      response => {
        this.inventoryData = response
      }
    )
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
    
    this.pihInventorySvc.saveInventoryData(this.listLotsScanned).subscribe(
      response => {
        this.isOpenScanInventoryModal = false;
        this.mapLotsScanned = new Map();
        this.listLotsScanned = new Array();

        this.getInventoryData(this.requestId);

      }
    )
  }

  scanLabel(event: any) {

    this.labelIpt.nativeElement.select();

    let data = event.target.value.split(';')

    let partNo = data[0];
    let qty = data[2];
    let lotNo = data[3]

    let obj = {
      lotNo: lotNo,
      partNo: partNo,
      qty: qty,
      requestId: this.requestId
    }
    
    this.mapLotsScanned.set(lotNo, obj);

    this.listLotsScanned = Array.from(
      this.mapLotsScanned.values()
    ).reverse();

    
  }


  startEdit(data: any) {
    setTimeout(() => {
      this.importQtyIpt.nativeElement.select();
    }, 400);
    this.lotNoEdit = data.lotNo;
  }

  stopEdit(): void {
    this.lotNoEdit = null;
    this.importQtyIpt.nativeElement.select();
  }

  deleteLabelScanned(data: any) {
    this.mapLotsScanned.delete(data.lotNo);
    this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();
  }

}
