import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ReWhService } from '../services/re-wh.service';

@Component({
  selector: 'app-rwh-send-pwh',
  templateUrl: './rwh-send-pwh.component.html',
  styleUrls: ['./rwh-send-pwh.component.scss'],
})
export class RwhSendPwhComponent implements OnInit {
  @ViewChild('qrCodeIpt') qrCodeIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  constructor(
    private router: Router,
    private reWhSvc: ReWhService,
    private toastr: ToastrService
  ) {}

  private baseUrl = environment.baseUrl;

  users: any;
  username: any;
  slips: any;
  slipNoSelected: any;
  sender: any;
  receiver: any;

  lots: any;
  mapLotsScanned: Map<string, object> = new Map();
  listLotsScanned: Array<any> = new Array();

  isOpenScanQRCodeModal = false;
  isOpenDetailModal = false;
  lotNoEdit: string | null = null;
  lotErrMsg: string | null = null;

  isLoading: boolean = false;

  ngOnInit(): void {
    this.getUsers();
    this.getSlipsRelayReturnWarehouse();
  }

  getUsers() {
    this.reWhSvc.getUsers({}).subscribe((response) => {
      this.users = response;
    });
  }

  getSlipsRelayReturnWarehouse() {
    this.reWhSvc.getSlipsRelayReturnWarehouse().subscribe((response) => {
      this.slips = response;
      console.log('Slips: ', this.slips);
    });
  }

  openScanQRCodeModal() {
    if (!this.receiver || !this.sender) {
      this.toastr.warning('Cần chọn người giao nhận','Warning');
      return;
    }
    this.isOpenScanQRCodeModal = true;
    this.isOpenDetailModal = false;
    setTimeout(() => {
      this.qrCodeIpt.nativeElement.focus();
    }, 500);
  }

  scanQRCode(event: any) {
    this.qrCodeIpt.nativeElement.select();

    let qrInfo = event.target.value.toUpperCase().split(';');

    let lot = {
      lotNo: qrInfo[3],
      recordType: 'MRTW',
      qty: qrInfo[2],
      partNo: qrInfo[0],
      date: new Date(),
      sender: this.sender,
      receiver: this.receiver,
      qrCode: event.target.value,
      whUserCode: this.receiver,
      flag: '1',
    };

    this.reWhSvc.scanMaterialV3(lot).subscribe((response) => {
      if (response.status == 'ERROR') {
        this.lotErrMsg = response.message;
        this.toastr.error('Có lỗi !', 'Error', {
          timeOut: 1500,
        });
        return;
      } else if (response.status == 'OK') {
        this.lotErrMsg = null;
        this.mapLotsScanned.set(event.target.value, response.data);
        this.listLotsScanned = Array.from(
          this.mapLotsScanned.values()
        ).reverse();
        return;
      }
    });
  }

  deleteQRCodeScanned(data: any) {
    this.mapLotsScanned.delete(data.qrCode);
    this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();
  }

  startEdit(data: any) {
    setTimeout(() => {
      this.importQtyIpt.nativeElement.focus();
    }, 500);
    this.lotNoEdit = data.lotNo;
  }

  stopEdit(data: any): void {
    console.log('stopEdit: ', data);
    if (data.qty > data.remainingQty) {
      data.qty = data.remainingQty
    } else if (data.qty < 0) {
      data.qty = 0
    }
    
    this.lotNoEdit = null;
  }

  sendLotToPWH() {
    
    if (!this.listLotsScanned.length) {
      this.toastr.warning('Không có Lot được trả', 'Info');
      return;
    }
    
    this.isLoading = true;

    // TH1: Thêm NVL vào phiếu đã tồn tại
    if (this.slipNoSelected) {
      let saveData = [...this.listLotsScanned];
      for (const item of saveData) {
        item.slipNo = this.slipNoSelected;
      }

      this.reWhSvc.saveMaterials(saveData).subscribe((response) => {
        this.getSlipsRelayReturnWarehouse();
        this.isOpenScanQRCodeModal = false;
        this.toastr.success('Trả thành công', 'Success');
        this.listLotsScanned = new Array();
        this.mapLotsScanned = new Map();
        this.isLoading = false;
      });
      return;
    }

    // TH2: Thêm mới phiếu trả NVL
    this.reWhSvc.generateSlipNo('MRTW', this.sender).subscribe((response) => {
      let saveData = [...this.listLotsScanned];

      for (const item of saveData) {
        item.slipNo = response.slipNo;
      }

      this.reWhSvc.saveMaterials(saveData).subscribe((response) => {
        this.getSlipsRelayReturnWarehouse();
        this.isOpenScanQRCodeModal = false;
        this.toastr.success('Trả thành công', 'Success');
        this.listLotsScanned = new Array();
        this.mapLotsScanned = new Map();
        this.isLoading = false;
      });
    });
  }

  cancelSendLotToPWH(){
    this.isOpenScanQRCodeModal = false  
    this.slipNoSelected = null;
  }

  onRowClick(event: any) {

    console.log(event.data.slipNo);
    

    if (!this.receiver || !this.sender) {
      this.toastr.warning('Cần chọn người giao nhận','Warning');
      return;
    }

    this.slipNoSelected = event.data.slipNo
    this.reWhSvc
      .getSlipsRelayReturnWarehouseDetail(event.data.slipNo)
      .subscribe((response) => {
        this.buildData(response);
        this.isOpenDetailModal = true;
      });
  }

  buildData(data: any) {
    let parts = data.parts;
    let lotGroups = data.lotGroups;
    let lots = data.lots;

    console.log('parts: ', parts);

    let results = new Array();
    for (const part of parts) {
      let obj = {
        partNo: part.partNo,
        qty: part.qty,
        lotGroups: new Array(),
        lots: new Array(),
      };
      results.push(obj);
    }

    for (const result of results) {
      for (const lotGroup of lotGroups) {
        if (result.partNo == lotGroup.partNo) {
          result.lotGroups.push(lotGroup);
        }
      }

      for (const lot of lots) {
        if (result.partNo == lot.partNo) {
          result.lots.push(lot);
        }
      }
    }

    this.lots = results;
    console.log('LOTS: ', this.lots);
  }

  closeDetailModal() {
    this.isOpenDetailModal = false;
    this.slipNoSelected = null;
  }

  onExportExcel(item: any) {
    let date = item.data.slipNo.replace('MRTW','').slice(0,-2)
    let url = `https://10.92.176.57:8080/pur_wh_records.summary?date=${date}&model=&slip_no=${item.data.slipNo}&product_type_id=&record_type=MRTW&area_id=`

    window.open(url, '_blank');
  }

  deleteLot(lot: any) {
    console.log('LOT: ', lot);
    this.reWhSvc.deletePurWhRecordById(lot.id).subscribe(
      response => {
        this.reWhSvc.getSlipsRelayReturnWarehouseDetail(this.slipNoSelected).subscribe(
          response => {
            this.buildData(response);
          }
        )
        this.toastr.success('OK','Success');
      }
    )
  }
}
