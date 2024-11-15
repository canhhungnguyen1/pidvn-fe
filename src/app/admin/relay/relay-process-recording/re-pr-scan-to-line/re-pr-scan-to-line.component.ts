import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { RePrService } from '../services/re-pr.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InfoScan } from '../models/InfoScanDto';
import { LotDto } from '../models/LotDto';

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
    private rePrSvc: RePrService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}


  ngOnInit(): void {
    
  }


  processes: any = [
    {id: 29, name: 'WIP-1'},
    {id: 30, name: 'WIP-2'},
    {id: 31, name: 'WIP-3'},
    {id: 32, name: 'WIP-4'}
  ]

  infoScan: InfoScan = new InfoScan();


  /**
   * Scan các thông tin về User ID, QA card, Process
   * @param event
   */
  scanInfo(event: any) {

    debugger

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


    this.selectTextInput('infoIpt')

    let isOk = this.infoScan.isAllPropertiesHaveValue();

    if (isOk) {
      this.isOpenScanQRCodeModal = true
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
  }


  openScanQRCodeModal() {
    this.nzTitleScanQRCodeModal = `Nhập NVL vào LINE: ${this.infoScan.line}; Process: ${this.infoScan.processName}`;

    this.isOpenScanQRCodeModal = true;

    setTimeout(() => {
      this.qrCodeIpt.instance.focus();
    }, 500);
  }


  isOpenScanQRCodeModal:boolean = false
  nzTitleScanQRCodeModal: string = 'Scan NVL vào Line'
  lotScanErrors: LotDto[] = []; // Lưu các lot khi scan vào Line bị lỗi
  litsLotScanOk: LotDto[] = []; // Lưu các lot khi scan vào Line OK (insert vào database)
  mapLotScanned: Map<string, LotDto> = new Map<string, LotDto>();

  lotNoEdit: string | null = null;

  scanQRCode(event: any) {

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
}
