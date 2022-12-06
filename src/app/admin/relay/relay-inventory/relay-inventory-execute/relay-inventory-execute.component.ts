import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RelayInventoryService } from '../services/relay-inventory.service';

@Component({
  selector: 'app-relay-inventory-execute',
  templateUrl: './relay-inventory-execute.component.html',
  styleUrls: ['./relay-inventory-execute.component.scss'],
})
export class RelayInventoryExecuteComponent implements OnInit, AfterViewInit {
  @ViewChild('infoIpt') infoIpt!: ElementRef;
  @ViewChild('qrCodeIpt') qrCodeIpt!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private reIvtSvc: RelayInventoryService,
    public route: ActivatedRoute
  ) {}

  reqNo!: string;

  infoScan = {
    username: null,
    position: null,
  };
  lotErrMsg: string | null = null;
  isOpenScanMaterialModal: boolean = false;
  isOpenLotDetailModal: boolean = false;

  relayInventories: any;
  lotSelected: any;
  materialScanned = new Array();

  ngOnInit(): void {
    this.getInventoryRequest();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.infoIpt.nativeElement.focus();
    }, 0);
  }

  scanInfo(event: any) {
    let data = event.target.value;
    this.infoIpt.nativeElement.select();

    // Scan gói NVL
    if (data.includes('*') && data.includes(';') && data.includes('-')) {
      if (!this.infoScan.username || !this.infoScan.position) {
        this.toastr.warning('Cần scan User và Vị trí kiểm kê !', 'Warning');
        return;
      }
      if (this.infoScan.username && this.infoScan.position) {
        return;
      }
    }

    // Scan User
    if (/^\d+$/.test(data)) {
      this.infoScan.username = data;
    } else {
      this.infoScan.position = data;
    }

    if (this.infoScan.username && this.infoScan.position) {
      this.openScanQRCodeModal();
      return;
    }
  }

  getInventoryRequest() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.reIvtSvc.getInventoryRequest(id).subscribe((response) => {
      this.reqNo = response.reqNo;
      this.getRelayInventories(this.reqNo);
    });
  }

  getRelayInventories(reqNo: string) {
    this.reIvtSvc.getRelayInventories(reqNo).subscribe((response) => {
      this.relayInventories = response;
    });
  }

  openScanQRCodeModal() {
    this.isOpenScanMaterialModal = true;
    setTimeout(() => {
      this.qrCodeIpt.nativeElement.select();
    }, 500);
  }

  

  scanMaterial(event: any) {
    if (!event.target.value) {
      this.toastr.warning('Cần scan tem NVL', 'Warning');
      return;
    }
    this.qrCodeIpt.nativeElement.select();

    let data = event.target.value.split(';');

    let obj = {
      reqNo: this.reqNo,
      date: new Date(),
      recordType: 'IVT',
      partNo: data[0],
      lotNo: data[3],
      qty: Number(data[2]),
      createdBy: this.infoScan.username,
      line: this.infoScan.position,
    };

    this.reIvtSvc.scanMaterial(obj).subscribe((response) => {
      if (response.status == 'OK') {
        this.lotErrMsg = null;

        this.materialScanned.push(response.data);
        this.materialScanned = [...this.materialScanned.reverse()];
      } else if (response.status == 'ERROR') {
        this.lotErrMsg = response.message;
      }
    });
  }

  closeScanMaterialModal() {
    this.lotErrMsg = null;
    this.isOpenScanMaterialModal = false;
    this.infoScan.username = null;
    this.infoScan.position = null;
    this.materialScanned = new Array();
    this.reIvtSvc.getRelayInventories(this.reqNo).subscribe((response) => {
      this.relayInventories = response;
    });
  }

  openDetailModal(data: any) {
    this.isOpenLotDetailModal = true;
    this.lotSelected = data ;
    
  }

  saveChange() {
    console.log(this.lotSelected);
    this.reIvtSvc.saveRelayInventory(this.lotSelected).subscribe(
      response => {
        this.isOpenLotDetailModal = false;

      }
    )
  }
  
  cancelEdit() {
    this.isOpenLotDetailModal = false;
  }

  onExportClient(event: any) {}
  
}
