import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { ToastrService } from 'ngx-toastr';
import { ReWhService } from '../services/re-wh.service';

/**
 * Nhận NVL từ LINE trả ra kho trung chuyển
 */
@Component({
  selector: 'app-rwh-receive-lwh',
  templateUrl: './rwh-receive-lwh.component.html',
  styleUrls: ['./rwh-receive-lwh.component.scss']
})
export class RwhReceiveLwhComponent implements OnInit {

  @ViewChild('userIpt') userIpt!: NzSelectComponent;
  @ViewChild('qrCodeIpt') qrCodeIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;
  
  constructor(private reWhSvc: ReWhService, private toastr: ToastrService) { }

  lines: any;
  remainMaterial: any;
  sender: any;
  receiver: any;
  line: any
  users: any;
  username!: string;

  lots: any;
  mapLotsScanned: Map<string, object> = new Map();
  listLotsScanned: Array<any> = new Array();

  isOpenScanQRCodeModal = false;
  lotNoEdit: string | null = null;
  lotErrMsg: string | null = null;

  ngOnInit(): void {
    this.getUsers();
    this.getLines();
  }

  getUsers() {
    this.reWhSvc.getUsers({}).subscribe((response) => {
      this.users = response;
    });
  }

  getLines() {
    this.reWhSvc.getLines(5).subscribe(
      response => {
        this.lines = response
      }
    )
  }

  scanUser(event: any) {
    if (!this.username) {
      this.toastr.warning('Mã nhân viên không hợp lệ !');
      this.userIpt.clearInput();
      return;
    }
  }

  showModal(): void {
    if (!this.sender || !this.receiver || !this.line) {
      this.toastr.warning('Cần nhập thông tin người giao nhận, Line sản xuất');
      return;
    }
    this.isOpenScanQRCodeModal = true;
    setTimeout(() => {
      this.qrCodeIpt.nativeElement.focus();
    }, 500);
  }

  scanQRCode(event: any) {
    
    debugger;
    this.qrCodeIpt.nativeElement.select();

    let qrInfo = event.target.value.toLocaleUpperCase().split(';');

    let lot = {
      lotNo: qrInfo[3],
      recordType: 'CTR',
      qty: qrInfo[2],
      partNo: qrInfo[0],
      sender: this.sender,
      receiver: this.receiver,
      whUserCode: this.sender,
      line: this.line,
      date: new Date(),
      flag: '5',
      qrCode: event.target.value.toLocaleUpperCase(),
    };

    this.reWhSvc.scanMaterialV3(lot).subscribe(
      response =>{
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
      }
    )

  }

  receiveLotsFromLineWh() {
    if (!this.listLotsScanned.length) {
      this.toastr.warning('Không có Lot nào được lưu !');
      return;
    }

    console.log('SAVE DATA: ', this.listLotsScanned);
    

    this.reWhSvc
      .saveMaterials(this.listLotsScanned)
      .subscribe((response) => {
        this.isOpenScanQRCodeModal = false;
        this.mapLotsScanned = new Map();
        this.listLotsScanned = new Array();
      });


  }

  deleteQRCodeScanned(data: any) { 
    this.mapLotsScanned.delete(data.qrCode);
    this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();
  }


  startEdit(data: any) {
    console.log('AAAA');
    setTimeout(() => {
      this.importQtyIpt.nativeElement.focus();
    }, 500);
    this.lotNoEdit = data.lotNo;
  }

  stopEdit(): void {
    this.lotNoEdit = null;
  }
}
