import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RePrService } from '../services/re-pr.service';

@Component({
  selector: 'app-lwh-send-line',
  templateUrl: './lwh-send-line.component.html',
  styleUrls: ['./lwh-send-line.component.scss'],
})
export class LwhSendLineComponent implements OnInit, AfterViewInit {
  @ViewChild('qrCodeIpt') qrCodeIpt!: ElementRef;
  @ViewChild('infoIpt') infoIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  constructor(private toastr: ToastrService, private rePrSvc: RePrService) { }

  partsOfModel: any;
  processes = new Array();
  isOpenScanQRCodeModal: boolean = false;
  nzTitleScanQRCodeModal!: string;
  materials: any; 
  materialOrder: any; // hiển thị theo thứ tự
  mapLotsScanned: Map<string, any> = new Map();
  listLotsScanned: Array<any> = new Array();
  lotNoEdit: string | null = null;
  lotErrMsg: string | null = null;
  lotWarningMsg: string | null = null; // Lưu trường hợp cảnh báo hàng sắp hết hạn
  isLoadingSaveBtn: boolean = false;

  isOpenEditMaterialModal: boolean = false;

  infoScan = {
    qaCard: '',
    model: '',
    line: '',
    date: '',
    shift: '',
    user: '',
    processId: '',
    processName: ''
  };

  ngOnInit(): void {
    this.getProcesses();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.infoIpt.nativeElement.focus();
    }, 0);
  }

  getProcesses() {
    this.rePrSvc.getProcesses().subscribe((response) => {
      for (const item of response) {
        if (/^WIP-/.test(item.name)) {
          this.processes.push(item);
        }
      }
    });
  }

  deleteHistory(item: any) {
    this.rePrSvc.deleteMaterial(item).subscribe((response) => {
      this.toastr.success('Xóa thành công !', 'Success');
    });
  }

  getPartsByModel(model: any) {
    this.rePrSvc.getPartsByModel(model).subscribe((response) => {
      let parts = new Array();
      for (const item of response) {
        parts.push(item.pncomp);
      }
      this.partsOfModel = parts;
      console.log('Parts of Model: ', this.partsOfModel);
    });
  }

  openScanQRCodeModal() {
    this.nzTitleScanQRCodeModal = `Nhập NVL vào LINE: ${this.infoScan.line}; Process: ${this.infoScan.processName}`;

    this.isOpenScanQRCodeModal = true;

    setTimeout(() => {
      this.qrCodeIpt.nativeElement.focus();
    }, 500);
  }



  scanOrdinal: number = 0;  // Biến này dùng để lưu thứ tự khi scan hàng

  scanQRCode(event: any) {
    this.scanOrdinal = this.scanOrdinal + 1;
    this.qrCodeIpt.nativeElement.select();

    let qrInfo = event.target.value.split(';');
    let qaCardInfo = this.infoScan.qaCard.split('*');

    let lot = {
      partNo: qrInfo[0],
      lotNo: qrInfo[3],
      recordType: 'CDL',
      qty: qrInfo[2],
      originQty: qrInfo[2],
      model: qaCardInfo[0],
      line: qaCardInfo[1],
      date: new Date(qaCardInfo[2]),
      shift: qaCardInfo[3],
      qaCard: this.infoScan.qaCard,
      processId: this.infoScan.processId,
      sender: this.infoScan.user,
      qrCode: event.target.value,
      ordinal: this.scanOrdinal
    };

    // Check nhầm NVL
    if (!this.partsOfModel.includes(lot.partNo)) {
      this.lotErrMsg = `Lot ${lot.lotNo} không dùng cho model ${lot.model}`;
      this.lotWarningMsg = null;
      this.toastr.error('Có lỗi !', 'Error', {
        timeOut: 1500,
      });
      return;
    }

    /**
     * Server Check
     * Push lot lên server để kiểm tra
     * Nếu OK thì add vào mapLotsScanned
     * Nếu có lỗi thì hiển thị thông báo
     */

    this.rePrSvc.scanMaterialV3(lot).subscribe((response) => {
      if (response.status == 'ERROR') {
        this.lotWarningMsg = null;
        this.lotErrMsg = response.message;
        this.toastr.error('Có lỗi !', 'Error', {
          timeOut: 1500,
        });
        return;
      } else if (response.status == 'OK') {

        if (response.warning) {
          this.lotWarningMsg = response.warning
        } else {
          this.lotWarningMsg = null
        }

        this.lotErrMsg = null;
        this.mapLotsScanned.set(event.target.value, response.data);
        this.listLotsScanned = Array.from(
          this.mapLotsScanned.values()
        ).reverse();
        return;
      }
    });
  }

  startEdit(data: any) {
    setTimeout(() => {
      this.importQtyIpt.nativeElement.select();
    }, 300);
    this.lotNoEdit = data.lotNo;
  }

  stopEdit(data: any): void {
    if (data.qty > data.remainingQty) {
      data.qty = data.remainingQty
    } else if (data.qty < 0) {
      data.qty = 0
    }
    this.lotNoEdit = null;
  }

  /**
   * Xóa QR Code vừa Scann
   * @param data
   */
  deleteQRCodeScanned(data: any) {
    this.mapLotsScanned.delete(data.qrCode);
    this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();
  }

  sendToLine() {
    this.isLoadingSaveBtn = true;
    console.log(this.listLotsScanned);

    if (!this.listLotsScanned.length) {
      return;
    }

    this.scanOrdinal = 0;

    this.rePrSvc.saveMaterials(this.listLotsScanned).subscribe(
      response => {
        this.getMaterials();
        this.isOpenScanQRCodeModal = false;
        this.mapLotsScanned = new Map();
        this.listLotsScanned = new Array();
        this.isLoadingSaveBtn = false;

        // this.infoScan.qaCard = '';
        this.infoScan.model = '';
        this.infoScan.line = '';
        this.infoScan.date = '';
        this.infoScan.shift = '';
        this.infoScan.user = '';
        this.infoScan.processId = '';
        this.infoScan.processName = '';
        this.lotErrMsg = null;
        this.lotWarningMsg = null;
      },
      error => {
        this.isOpenScanQRCodeModal = false;
        this.isLoadingSaveBtn = false;
        this.lotErrMsg = null;
        this.lotWarningMsg = null;
      }


    );
  }

  /**
   * Scan các thông tin về User ID, QA card, Process
   * @param event
   */
  scanInfo(event: any) {
    let dataScan = event.target.value;

    let info = dataScan.split('*');

    // Scan QA card
    if (info.length === 5) {

      if (dataScan.includes(';')) {
        this.toastr.warning('Cần scan ID, QA card, WIP', 'Warning');
        this.infoIpt.nativeElement.select();
        return;
      }

      this.infoScan.qaCard = dataScan;
      this.infoScan.model = info[0];
      this.infoScan.line = info[1];
      this.infoScan.date = info[2];
      this.infoScan.shift = info[3];

      this.getPartsByModel(this.infoScan.model);
      this.getMaterials();
    }

    // Scan User
    if (dataScan.length === 7) {
      this.infoScan.user = dataScan;
    }

    // Scan Process
    if (/^WIP-/.test(dataScan)) {
      console.log('SCAN Process');
      console.log('Processes: ', this.processes);
      this.infoScan.processName = dataScan;

      for (const process of this.processes) {
        if (this.infoScan.processName == process.name) {
          this.infoScan.processId = process.id;
          break;
        }
      }
    }
    // const isEmpty = Object.values(this.infoScan).some(
    //   (x) => x == null || x == ''
    // );

    // Kiểm tra đầy đủ thông tin scan mới cho scan tem NVL
    const isEmpty = Object.values(this.infoScan).some(
      (x) => x == null || x === '' || 
             (typeof x === 'string' && x.trim() === '') ||
             (Array.isArray(x) && x.length === 0) ||
             (typeof x === 'object' && !Array.isArray(x) && Object.keys(x).length === 0)
    );




    if (!isEmpty) {
      this.openScanQRCodeModal();
    }
    this.infoIpt.nativeElement.select();
  }

  getMaterials() {
    this.rePrSvc
      .getMaterials({
        qaCard: this.infoScan.qaCard,
        recordTypes: ['CDL'],
      })
      .subscribe((response) => {

        
        
        
        this.materialOrder = response;
        this.materials = this.buildData(response);

        console.log('materialOrder',this.materialOrder);
        console.log('materials',this.materials);

      });
  }

  buildData(lots: any) {
    let partSet = new Set();
    for (const item of lots) {
      partSet.add(item.partNo);
    }

    let parts = Array.from(partSet);

    let results = new Array();
    for (const part of parts) {
      let obj = {
        partNo: part,
        qty: 0,
        lots: new Array()
      }
      results.push(obj)
    }

    for (const part of results) {
      for (const lot of lots) {
        if (part.partNo === lot.partNo) {
          part.lots.push(lot)
        }
      }
    }

    for (const data of results) {
      let sumQty = 0;
      for (const lot of data.lots) {
        sumQty += lot.qty;
      }
      data.qty = sumQty
    }

    return results;
  }

  materialEdit: any;

  openEditMaterialModal(data: any) {
    this.materialEdit = { ...data };
    this.isOpenEditMaterialModal = true
  }

  editMaterial() {
    this.rePrSvc.editMaterialControl(this.materialEdit).subscribe(
      response => {
        this.getMaterials();
        this.toastr.success('Đã sửa !', 'Success')
        this.isOpenEditMaterialModal = false
        this.infoIpt.nativeElement.select();
      }
    )
  }

  deleteMaterial(data: any) {
    this.rePrSvc.deleteMaterial(data).subscribe(
      response => {
        this.getMaterials();
        this.toastr.success('Đã xóa !', 'Success')
      }
    )

  }
}
