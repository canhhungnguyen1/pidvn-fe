import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxTextBoxComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { InfoScan } from '../models/InfoScanDto';
import { LotDto } from '../models/LotDto';
import { RePrScanToLineService } from '../services/re-pr-scan-to-line.service';
import { MaterialControlDto } from '../models/MaterialControlDto';

@Component({
  selector: 'app-re-pr-scan-to-line',
  templateUrl: './re-pr-scan-to-line.component.html',
  styleUrl: './re-pr-scan-to-line.component.scss',
  providers: [DatePipe],
})
export class RePrScanToLineComponent implements OnInit {
  @ViewChild('infoIpt') infoIpt!: DxTextBoxComponent;
  @ViewChild('qrCodeIpt') qrCodeIpt!: DxTextBoxComponent;
  @ViewChild('qtyIpt') qtyIpt!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private rePrScanToLineSvc: RePrScanToLineService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  processes: any = [
    { id: 29, name: 'WIP-1' },
    { id: 30, name: 'WIP-2' },
    { id: 31, name: 'WIP-3' },
    { id: 32, name: 'WIP-4' },
  ];

  infoScan: InfoScan = new InfoScan();
  isOpenScanQRCodeModal: boolean = false;
  nzTitleScanQRCodeModal: string = 'Scan NVL vào Line';
  lotScanErrors: LotDto[] = []; // Lưu các lot khi scan vào Line bị lỗi
  litsLotScanOk: LotDto[] = []; // Lưu các lot khi scan vào Line OK (insert vào database)
  mapLotScanned: Map<string, LotDto> = new Map<string, LotDto>();
  lotNoEdit: string | null = null;
  responseQRScan: any;
  isLoading: boolean = false;
  materials: any [] = []

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
        this.selectTextInput('infoIpt');
        return;
      }

      this.infoScan.qaCard = dataScan;
      this.infoScan.model = info[0];
      this.infoScan.line = info[1];
      this.infoScan.date = info[2];
      this.infoScan.shift = info[3];

      this.rePrScanToLineSvc.getMaterialsInsertToLine(this.infoScan.qaCard).subscribe(
        response => {
          this.materials = response.result
        }
      )

    }

    // Scan UserID
    if (dataScan.length === 7) {
      this.infoScan.user = dataScan;
    }

    // Scan Process
    if (/^WIP-/.test(dataScan)) {
      this.infoScan.processName = dataScan;
      for (const process of this.processes) {
        if (this.infoScan.processName == process.name) {
          this.infoScan.processId = process.id;
          break;
        }
      }
    }

    this.selectTextInput('infoIpt');

    let isOk = this.infoScan.isAllPropertiesHaveValue();

    if (isOk) {
      this.openScanQRCodeModal();
    }
  }

  selectTextInput(input: string) {
    if (input === 'infoIpt') {
      const inputElement = this.infoIpt.instance
        .element()
        .querySelector('input');
      if (inputElement) {
        inputElement.select();
        return;
      }
    }

    if (input === 'qrCodeIpt') {
      const inputElement = this.qrCodeIpt.instance
        .element()
        .querySelector('input');
      if (inputElement) {
        inputElement.select();
        return;
      }
    }
  }


  /**
   * Scan tem NVL
   */
  count: number = 0;
  openScanQRCodeModal() {
    this.count = 0

    this.nzTitleScanQRCodeModal = `Nhập NVL vào LINE: ${this.infoScan.line}; Process: ${this.infoScan.processName}`;

    console.log('this.nzTitleScanQRCodeModal: ', this.nzTitleScanQRCodeModal);
    

    this.isOpenScanQRCodeModal = true;

    setTimeout(() => {
      this.qrCodeIpt.instance.focus();
    }, 500);
  }

  scanQRCode(event: any) {
    let label = event.target.value;

    let obj = new LotDto();
    obj.lotNo = label.split(';')[3];


    // Kiểm tra lot đã được scan chưa
    if (this.mapLotScanned.has(obj.lotNo)) {
      this.responseQRScan.status = 'OK'
      return;
    }
    


    this.rePrScanToLineSvc.scanMaterial(obj).subscribe((response) => {
      this.responseQRScan = response.result;

      if (this.responseQRScan.status == 'ERROR') {
        return;
      }

      this.count++;
      this.responseQRScan.data.ordinal = this.count
      this.mapLotScanned.set(obj.lotNo, this.responseQRScan.data);
      this.litsLotScanOk = Array.from(this.mapLotScanned.values()).reverse();
    });
  }

  startEdit(data: any) {
    setTimeout(() => {
      this.qtyIpt.nativeElement.focus();
    }, 500);
    this.lotNoEdit = data.lotNo;
  }

  stopEdit(data: any): void {
    console.log('stopEdit: ', data);
    if (data.qty > data.remainQty) {
      data.qty = data.remainQty;
    } else if (data.qty < 0) {
      data.qty = 0;
    }

    this.lotNoEdit = null;
  }

  /**
   * Xóa Lot vừa Scan để chuẩn bị lưu
   * @param data
   */
  deleteLotScanned(data: any) {
    console.log(this.mapLotScanned);
    this.mapLotScanned.delete(data.lotNo);
    this.litsLotScanOk = Array.from(this.mapLotScanned.values()).reverse();
  }

  /**
   * Lưu NVL
   */
  insertToLine() {
    let data: MaterialControlDto[] = new Array();

    for (const item of this.litsLotScanOk) {

      if (item.qty <= 0) {
        continue
      }

      let obj = new MaterialControlDto();
      obj.ppn = this.infoScan.model
      obj.cpn = item.model
      obj.line = this.infoScan.line;
      obj.date = new Date(this.infoScan.date);
      obj.shift = this.infoScan.shift;
      obj.plotno = this.infoScan.qaCard;
      obj.clotno = item.lotNo;
      obj.qty = item.qty;
      obj.frBox = 0;
      obj.user1 = this.infoScan.user
      obj.user2 = this.infoScan.user
      obj.keyUser = this.infoScan.user
      obj.ngQty = 0
      obj.recordType = 'CDL'
      obj.processId = this.infoScan.processId
      obj.ordinal = item.ordinal
      obj.remark = 'HungTest 2024-29-11'
      data.push(obj);
    }


    if (data.length <= 0) {
      this.toastr.warning('Không có dữ liệu','Warning')
      return
    }


    this.isLoading = true

    this.rePrScanToLineSvc.insertToLine(data).subscribe(
      response => {
        this.isLoading = false
        this.mapLotScanned = new Map();
        this.litsLotScanOk = new Array();

      },
      error => {
        this.isLoading = false
      }
    )

    
    
  }
}
