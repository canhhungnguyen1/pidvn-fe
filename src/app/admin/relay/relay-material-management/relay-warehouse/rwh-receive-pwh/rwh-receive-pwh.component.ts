import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReWhService } from '../services/re-wh.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-rwh-receive-pwh',
  templateUrl: './rwh-receive-pwh.component.html',
  styleUrls: ['./rwh-receive-pwh.component.scss'],
})
export class RwhReceivePwhComponent implements OnInit, AfterViewInit {
  @ViewChild('qrCodeIpt') qrCodeIpt!: ElementRef;
  @ViewChild('qaCardIpt') qaCardIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reWhSvc: ReWhService,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {}

  

  slipNo: any;
  users: any;
  sender: any;
  receiver: any;
  lots: any;
  mapLotsScanned: Map<string, object> = new Map();
  listLotsScanned: Array<any> = new Array();
  arrLots: string[] = [];

  isOpenScanQRCodeModal = false;
  isOpenErrorModal = false;

  errorScanList: any = new Array();

  lotErrMsg: string | null = null;

  isOpenQACardModal: boolean = false;
  qaCard!: string;

  lotsReceived: any;

  isLoading: boolean = false;

  lotNoEdit: string | null = null;

  isLocked: boolean = false;

  ngOnInit(): void {
    this.slipNo = this.activatedRoute.snapshot.paramMap.get('slipNo');
    this.getMaterialsBySlipNo();
    this.getUsers();
    this.getLotRequestAndLotReceive();
    
  }

  ngAfterViewInit(): void {
  }

  getUsers() {
    this.reWhSvc.getUsers({}).subscribe((response) => {
      this.users = response;
    });
  }


  /**
   * Lấy danh sách các gói NVL theo số phiếu xuất kho
   */
  getMaterialsBySlipNo() {
    this.reWhSvc.getMaterialsBySlipNo(this.slipNo).subscribe((response) => {
      this.lots = response.lots;

      for (const lot of this.lots) {
        this.arrLots.push(lot.lotNo);
      }

      this.prepareData(response);
    });
  }

  prepareData(data: any) {
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

  showModal(): void {

    if (this.isLocked) {
      this.toastr.warning('Phiếu đã khóa do đã nhận đủ NVL','Warning');
      return;
    }

    if (!this.sender || !this.receiver) {
      this.toastr.warning('Cần nhập thông tin người giao nhận','Warning');
      return;
    }
    this.isOpenScanQRCodeModal = true;
    setTimeout(() => {
      this.qrCodeIpt.nativeElement.focus();
    }, 500);
  }

  scanQRCode(event: any) {
    this.qrCodeIpt.nativeElement.select();

    let qrInfo = event.target.value.toUpperCase().split(';');

    let obj = {
      lotNo: qrInfo[3],
      recordType: 'RNP',
      qty: qrInfo[2],
      partNo: qrInfo[0],
      date: new Date(),
      sender: this.sender,
      receiver: this.receiver,
      whUserCode: this.sender,
      reqNo: this.slipNo,
      flag: '5',
      qrCode: event.target.value,
    };

    /**
     * Kiểm tra xem gói NVL scan có trong phiếu xuất kho không
     * Nếu không có thì thông báo lỗi
     */
    if (!this.arrLots.includes(obj.lotNo)) {
      let errMsg = `Lot ${obj.lotNo} không thuộc phiếu xuất kho ${this.slipNo}`;
      this.lotErrMsg = errMsg;

      this.errorScanList.push(errMsg);

      this.toastr.error('Có lỗi !', 'Error', {
        timeOut: 1500,
      });
      return;
    }

    /**
     * Nếu OK thì request lên server để kiểm tra
     */

    this.reWhSvc.scanMaterialV3(obj).subscribe((response) => {
      if (response.status == 'ERROR') {
        this.lotErrMsg = response.message;
        this.errorScanList.push(response.message);
        this.toastr.error('Có lỗi !', 'Error', {
          timeOut: 1500,
        });
        return;
      } else if (response.status == 'OK') {
        console.log('DATA: ', response);

        this.lotErrMsg = null;
        this.mapLotsScanned.set(event.target.value, response.data);
        this.listLotsScanned = Array.from(
          this.mapLotsScanned.values()
        ).reverse();
        return;
      }
    });
    
  }

  receiveLotsFromPWH() {
    if (!this.listLotsScanned.length) {
      this.toastr.warning('Không có Lot nào được lưu !');
      return;
    }

    this.isLoading = true;

    this.reWhSvc
      .saveMaterials(this.listLotsScanned)
      .subscribe((response) => {
        this.isLoading = false;
        this.lotsReceived = response.data;
        this.getMaterialsBySlipNo();
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
    this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();
  }

  clearErrorScan() {
    this.errorScanList = new Array();
  }

  openQACardModal() {

    this.isOpenQACardModal = true;
    setTimeout(() => {
      this.qaCardIpt.nativeElement.focus();
    }, 500);
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

  moveMaterialToLineWh() {
    this.isLoading = true;

    if (!this.qaCard) {
      this.toastr.warning('Cần scan QA Card','Warning')
      this.qaCardIpt.nativeElement.focus();
      return
    }

    if (!this.lotsReceived) {
      this.toastr.warning('Không có Lots nào được lưu <br /> Cần scan từng Lot để lưu !','Warning');
      return;
    }

    // Tiến hành lưu các Lots đã nhận từ kho PUR-WH vào LINE-WH
    let saveData = new Array();
    let qaCardInfo = this.qaCard.toUpperCase().split('*');
    for (const item of this.lotsReceived) {
      let obj = {
        lotNo: item.lotNo,
        recordType: 'RDC',
        qty: item.qty,
        date: new Date(qaCardInfo[2]),
        line: qaCardInfo[1],
        shift: qaCardInfo[3],
        whUserCode: '3012982',
        partNo: item.model,
        model: qaCardInfo[0],
        qaCard: this.qaCard,
        sender: this.receiver
      }
      saveData.push(obj);
    }

    this.reWhSvc.saveMaterials(saveData).subscribe(
      response => {
        this.isLoading = false;
        this.toastr.success('Chuyển NVL thành công','Success')
        this.qaCard = '';
        this.isOpenQACardModal = false;
        this.lotsReceived = null;
      }
    )

  }

  cancelMoveMaterialToLineWh() {
    this.qaCard = '';
    this.isOpenQACardModal = false
  }

  deleteLot(lotNo: any) {
    this.reWhSvc.deletePurWhRecordById(lotNo.id).subscribe(
      response => {
        this.getMaterialsBySlipNo();
        this.toastr.success('Đã xóa','Success')
      }
    )
  }



  getLotRequestAndLotReceive() {
    this.reWhSvc.getLotRequestAndLotReceive(this.slipNo).subscribe(
      response => {
        console.log('getLotRequestAndLotReceive: ', response.result);

        let data = response.result;
        
        if (data.totalLotRequest === data.totalLotReceive) {
          this.isLocked = true
        }
      }
    )
  }


  
}
