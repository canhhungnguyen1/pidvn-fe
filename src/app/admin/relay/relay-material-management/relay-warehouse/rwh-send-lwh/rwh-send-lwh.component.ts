import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { ToastrService } from 'ngx-toastr';
import { ReWhService } from '../services/re-wh.service';

@Component({
  selector: 'app-rwh-send-lwh',
  templateUrl: './rwh-send-lwh.component.html',
  styleUrls: ['./rwh-send-lwh.component.scss'],
})
export class RwhSendLwhComponent implements OnInit {
  @ViewChild('qaCardIpt') qaCardIpt!: ElementRef;
  @ViewChild('userIpt') userIpt!: NzSelectComponent;
  @ViewChild('qrCodeIpt') qrCodeIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  constructor(private reWhSvc: ReWhService, private toastr: ToastrService) {}

  partsOfModel: any;

  users: any;
  username!: string;
  qaCard!: any;
  qrCode!: any;
  isOpenScanQRCodeModal: boolean = false;

  lotErrMsg: string | null = null;

  purWhRecords: any;
  mapLotsScanned: Map<string, any> = new Map();
  listLotsScanned: Array<any> = new Array();
  lotNoEdit: string | null = null;

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.userIpt.focus();
    }, 0);
  }

  getUsers() {
    this.reWhSvc.getUsers({}).subscribe((response) => {
      this.users = response;
    });
  }

  scanUser(event: any) {
    if (!this.username) {
      this.toastr.warning('Mã nhân viên không hợp lệ !');
      this.userIpt.clearInput();
      return;
    }

    this.qaCardIpt.nativeElement.focus();
  }

  scanQACard(event: any) {
    if (
      !this.qaCard ||
      this.qaCard.split('*').length < 4 ||
      this.qaCard.includes(';')
    ) {
      this.qaCardIpt.nativeElement.select();
      this.toastr.warning('QA Card không hợp lệ !');
      return;
    }

    this.getPartsByModel(this.qaCard.split('*')[0]);

    /**
     * Lấy dữ liệu đã nhập LINE-WH theo QA Card (record_type = 'RDC')
     */
    let searchVo = {
      qaCard: this.qaCard,
      recordType: 'RDC',
    };
    this.getPurWhRecords(searchVo);
  }

  getPartsByModel(model: string) {
    this.reWhSvc.getPartsByModel(model).subscribe((response) => {
      let parts = new Array();
      for (const item of response) {
        parts.push(item.pncomp);
      }
      this.partsOfModel = parts;
      console.log('Parts of Model: ', this.partsOfModel);
    });
  }

  getPurWhRecords(searchVo: any) {
    this.reWhSvc.getPurWhRecords(searchVo).subscribe((response) => {

      console.log('AAA : ', response);
      
      this.prepareData(response);
    });
  }

  checkQACardAndUser(): boolean {
    if (!this.username) {
      this.toastr.warning('Mã nhân viên không hợp lệ !');
      this.userIpt.clearInput();
      this.userIpt.focus();
      return false;
    }
    if (!this.qaCard || this.qaCard.split('*').length < 4) {
      this.toastr.warning('QA Card không hợp lệ !');
      this.qaCardIpt.nativeElement.select();
      return false;
    }

    return true;
  }

  openScanQRCodeModal() {
    if (!this.checkQACardAndUser()) {
      return;
    }

    this.isOpenScanQRCodeModal = true;
    setTimeout(() => {
      this.qrCodeIpt.nativeElement.focus();
    }, 500);
  }

  scanQRCode(event: any) {
    console.log('BẮT ĐẦU SCAN');

    this.qrCodeIpt.nativeElement.select();

    let qrInfo = event.target.value.split(';');
    let qaCardInfo = this.qaCard.split('*');
    let lot = {
      lotNo: qrInfo[3],
      recordType: 'RDC',
      qty: qrInfo[2],
      partNo: qrInfo[0],
      model: qaCardInfo[0],
      qaCard: this.qaCard,
      date: new Date(qaCardInfo[2]),
      line: qaCardInfo[1],
      shift: qaCardInfo[3],
      sender: this.username,
      receiver: this.username,
      qrCode: event.target.value,
      whUserCode: this.username,
      flag: '5',
    };

    // Check nhầm NVL
    if (!this.partsOfModel.includes(lot.partNo)) {
      this.lotErrMsg = `Lot ${lot.lotNo} không dùng cho model ${lot.model}`;
      this.toastr.error('Có lỗi !', 'Error', {
        timeOut: 1500,
      });
      return;
    }

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

  /**
   * Kho RE-WH chuyển NVL vào LINE-WH
   */
  sendMaterialToLineWh() {
    if (!this.listLotsScanned.length) {
      this.toastr.warning('Không có Lot nào được lưu !');
      return;
    }

    this.reWhSvc.saveMaterials(this.listLotsScanned).subscribe((response) => {
      let searchVo = {
        qaCard: this.qaCard,
        recordType: 'RDC',
      };
      this.getPurWhRecords(searchVo);
      this.isOpenScanQRCodeModal = false;
      this.mapLotsScanned = new Map();
      this.listLotsScanned = new Array();
    });
  }

  /**
   * Xóa QR Code vừa Scann
   * @param data
   */
  deleteQRCodeScanned(data: any) {
    this.mapLotsScanned.delete(data.qrCode);
    this.listLotsScanned = Array.from(this.mapLotsScanned.values());
  }

  startEdit(data: any) {
    setTimeout(() => {
      this.importQtyIpt.nativeElement.select();
    }, 300);
    this.lotNoEdit = data.lotNo;
  }

  stopEdit(): void {
    this.lotNoEdit = null;
    this.importQtyIpt.nativeElement.select();
  }

  deleteRecord(data: any) {
    console.log('Data Delete: ', data);
    
    this.reWhSvc.deletePurWhRecords(data.id).subscribe((response) => {
      this.toastr.success('Xóa thành công !', 'Success');
      let searchVo = {
        qaCard: this.qaCard,
        recordType: 'RDC',
      };
      this.getPurWhRecords(searchVo);
    });
  }

  prepareData(lots: any) {

    let parts: any[] = [];
    lots.reduce((res: any, value: any) => {
      if (!res[value.model]) {
        res[value.model] = { model: value.model, qty: 0 };
        parts.push(res[value.model]);
      }
      res[value.model].qty += value.qty;
      return res;
    }, {});

    let lotGroups: any[] = [];
    lots.reduce((res: any, value: any) => {
      if (!res[value.lotGroup]) {
        res[value.lotGroup] = { model: value.model, lotGroup: value.lotGroup, qty: 0 };
        lotGroups.push(res[value.lotGroup]);
      }
      res[value.lotGroup].qty += value.qty;
      return res;
    }, {});


    /**
     * 
     */
    
    let results = new Array();
    for (const part of parts) {
      let obj = {
        model: part.model,
        qty: part.qty,
        lotGroups: new Array(),
        lots: new Array(),
      };
      results.push(obj);
    }

    for (const result of results) {
      for (const lotGroup of lotGroups) {
        if (result.model == lotGroup.model) {
          result.lotGroups.push(lotGroup);
        }
      }

      for (const lot of lots) {
        if (result.model == lot.model) {
          result.lots.push(lot);
        }
      }
    }

    console.log('Result: ', results);
    this.purWhRecords = results
  }
}
