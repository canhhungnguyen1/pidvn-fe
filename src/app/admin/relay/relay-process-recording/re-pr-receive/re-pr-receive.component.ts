import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RePrService } from '../services/re-pr.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';
import { DxDataGridComponent, DxTextBoxComponent } from 'devextreme-angular';
import { LotDto } from '../models/LotDto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-re-pr-receive',
  templateUrl: './re-pr-receive.component.html',
  styleUrl: './re-pr-receive.component.scss',
  providers: [DatePipe],
})
export class RePrReceiveComponent implements OnInit, AfterViewInit {
  @ViewChild(DxDataGridComponent, { static: false })
  lotGrid!: DxDataGridComponent;

  @ViewChild('qtyIpt') qtyIpt!: ElementRef;
  @ViewChild('qrCodeIpt') qrCodeIpt!: DxTextBoxComponent;
  @ViewChild('userIdIpt') userIdIpt!: DxTextBoxComponent;
  @ViewChild('qaCardIpt') qaCardIpt!: DxTextBoxComponent;
  

  constructor(
    private toastr: ToastrService,
    private rePrSvc: RePrService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.requestNo =
      this.activatedRoute.snapshot.queryParamMap.get('requestNo');
  }

  ngAfterViewInit(): void {
    this.getRequestDetail();
  }

  lots: LotDto[] = [];
  requestNo: any;
  expandAll = true;
  isLoading: boolean = false;
  isOpenReceiveModal: boolean = false;
  isOpenLotScanErrorModal: boolean = false;

  lotScanErrors: LotDto[] = []; // Lưu các lot khi scan nhận bị lỗi
  litsLotScanOk: LotDto[] = []; // Lưu các lot khi scan nhận OK (insert vào database)
  mapLotScanned: Map<string, LotDto> = new Map<string, LotDto>();

  lotNoEdit: string | null = null;

  getRequestDetail() {
    let requestNo = this.activatedRoute.snapshot.queryParamMap.get('requestNo');

    this.lotGrid?.instance.beginCustomLoading(`Đang load dữ liệu ...`);

    this.rePrSvc.getRequestDetail(requestNo).subscribe((response) => {
      this.lots = response.result;
      this.lotGrid.instance.endCustomLoading();
    });
  }

  onExportClient(event: any) {
    console.log(event);

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');
    exportDataGrid({
      component: event.component,
      worksheet: worksheet,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'Data.xlsx'
        );
      });
    });
  }

  toggleExpandAll() {
    this.expandAll = !this.expandAll;
  }

  statusCellTemplate(cellElement: any, cellInfo: any) {
    // const status = cellInfo.value;
    // let color = status === 'Received' ? 'blue' : 'red';
    // let statusName = status === 'Received' ? 'Received' : 'Not yet';
    // cellElement.style.color = color;
    // cellElement.innerText = statusName;
  }

  onCellPreparedLotGrid(e: any) {
    if (e.rowType === 'data') {
      if (e.column.dataField === 'statusName') {
        const statusValue = e.row.data.status;

        if (statusValue === 0) {
          e.cellElement.style.color = 'red';
        } else if (statusValue === 1) {
          e.cellElement.style.color = 'green';
        }
      }

      if (e.column.dataField === 'lotNo') {
        const statusValue = e.row.data.status;
        if (statusValue === 1) {
          e.cellElement.style.backgroundColor  = 'rgb(197, 225, 165)';
          e.cellElement.style.fontWeight = 'bold';
        }

      }





    }
  }

  resetFiltersAndSorting() {
    this.lotGrid.instance.clearFilter();
    this.lotGrid.instance.clearSorting();
  }

  /**
   * Mở modal scan nhận NVL
   * @returns
   */
  openReceiveModal() {
    this.lotScanErrors = new Array();
    this.mapLotScanned = new Map<string, LotDto>();
    this.litsLotScanOk = new Array();

    let isReceivedAll = true;

    for (const obj of this.lots) {
      if (obj.status === 0) {
        isReceivedAll = false;
        break;
      }
    }

    // Kiểm tra NVL trong phiếu đã nhận đủ thì không được nhận nữa
    if (isReceivedAll) {
      this.toastr.warning('Đã nhận đủ NVL', 'Warning');
      return;
    }

    this.isOpenReceiveModal = true;

    setTimeout(() => {
      if (this.userIdIpt && this.userIdIpt.instance) {
        // Gọi focus() để focus vào dx-text-box ngay khi component được khởi tạo
        this.userIdIpt.instance.focus();
      }
    }, 500);
  }

  scanUserId(event: any) {
    let userId = event.target.value.toUpperCase();
    const inputElement = this.userIdIpt.instance
      .element()
      .querySelector('input');
    if (userId.length !== 7 || !!isNaN(Number(userId))) {
      this.toastr.warning('ID không hợp lệ', 'Warning');
      if (inputElement) {
        inputElement.select(); // Gọi select() trên input DOM
      }
      return;
    }

    this.qrCodeIpt.instance.focus();
  }

  scanQRCode(event: any) {
    /**
     * Kiểm tra bắt buộc phải nhập mã nhân viên
     */
    const userID = this.userIdIpt.instance.option('value');
    if (!userID) {
      this.toastr.warning('Cần scan mã nhân viên', 'Warning');
      this.userIdIpt.instance.focus();
      return;
    }

    /**
     * Scan NVL
     * 1. kiểm tra nếu lot đã được ghi nhận, thì ko cho lưu
     * 2. kiểm tra lot nếu không thuộc phiếu thì ko cho lưu
     */
    let qrInfo = event.target.value.toUpperCase().split(';');
    this.selectTextInput('qrCodeIpt');

    let isScanOK = false;

    let obj = new LotDto();
    obj.model = qrInfo[0];
    obj.lotNo = qrInfo[3];
    obj.qty = qrInfo[2];
    obj.receiver = userID;
    obj.date = new Date();
    obj.recordType = 'RNP';
    obj.flag = '5';
    obj.reqNo = this.requestNo;
    obj.qrCode = event.target.value.toUpperCase()

    for (const item of this.lots) {
      if (qrInfo[3] === item.lotNo) {
        if (item.status == 1) {
          // 1. Lot scan thuộc phiếu request và đã được ghi nhận
          isScanOK = false;
          obj.errorInfo = `Lot đã được scan nhận lúc: ${this.datePipe.transform(
            item.createdAt,
            'yyyy-MM-dd HH:mm'
          )}`;
          this.lotScanErrors.push(obj);
          this.toastr.warning('Lot đã được scan nhận', 'Warning');
          return;
        } else if (item.status == 0) {
          // 2. Lot scan thuộc phiếu request và chưa được ghi nhận
          isScanOK = true;
          if (item.lotNo === obj.lotNo) {
            obj.whUserCode = item.whUserCode
            obj.sender = item.sender
            break;
          }
        }
      }
    }

    if (!isScanOK) {
      // Trường hơp còn lại là Lot scan không thuộc phiếu request
      obj.errorInfo = 'Lot không thuộc phiếu request';
      this.toastr.warning('Lot không thuộc phiếu request', 'Warning');
      this.lotScanErrors.push(obj);
      this.selectTextInput('qrCodeIpt');
      return;
    }

    this.rePrSvc.validateLotReceive(obj).subscribe((response) => {
      let data =  response.result;
      data.date = new Date();
      this.mapLotScanned.set(obj.lotNo, data);
      this.litsLotScanOk = Array.from(this.mapLotScanned.values()).reverse();
      return;
    });
  }

  selectTextInput(input: string) {
    if (input === 'userIdIpt') {
      const inputElement = this.userIdIpt.instance
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

    if (input === 'qaCardIpt') {
      const inputElement = this.qaCardIpt.instance
        .element()
        .querySelector('input');
      if (inputElement) {
        inputElement.select();
        return;
      }
    }
  }


  /**
   * Lưu xác nhận nhận NVL
   */
  onReceiveMaterial() {
    this.isLoading = true;

    let saveData = [...this.litsLotScanOk];

    this.rePrSvc.onReceiveMaterials(saveData).subscribe(
      (response) => {
        this.getRequestDetail();
        this.isOpenReceiveModal = false;
        this.isLoading = false;
        this.toastr.success('Lưu thành công','Thông báo')
      },
      (error) => {
        this.getRequestDetail();
        this.isOpenReceiveModal = false;
        this.isLoading = false;
      }
    );





    this.getRequestDetail();
        this.isOpenReceiveModal = false;
        this.isLoading = false;

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
   * Xóa lot đã nhận
   */
  deleteLotReceived(event: any) {
    console.log('deleteLotReceived: ', event);
    let obj = event.data

    this.rePrSvc.deleteLotReceived(obj).subscribe(
      response => {
        this.getRequestDetail()
        this.toastr.success('Xóa thành công','Thông báo');
      }
    )
  }



  isOpenSendToLineWhModal: boolean = false

  openSendToLineWhModal() {
    this.isOpenSendToLineWhModal = true
    setTimeout(() => {
      if (this.qaCardIpt && this.qaCardIpt.instance) {
        // Gọi focus() để focus vào dx-text-box ngay khi component được khởi tạo
        this.qaCardIpt.instance.focus();
      }
    }, 500);
  }


  scanQRCard(event: any) {
    // const inputValue = this.qaCardIpt.value; // Lấy giá trị của ô input
    this.selectTextInput('qaCardIpt')
  }

  /**
   * Lưu xác nhận chuyển vào xe NVL
   */
  sendToLineWh() {

    
    if (!this.qaCardIpt.value) {
      this.toastr.warning('Cần scan QA card','Warning')
      return
    }


    let qrCard = this.qaCardIpt.value.split('*'); // Lấy giá trị của ô QA card

    let saveData = [...this.litsLotScanOk];

    for (const item of saveData) {
      item.recordType = 'RDC';
      item.flag = '5';
      item.reqNo = null;
      item.parent = qrCard[0];
      item.line = qrCard[1];
      item.date = new Date(qrCard[2]);
      item.shift = qrCard[3];
      item.qaCard = this.qaCardIpt.value
      item.sender = item.receiver
      item.createdAt = new Date();
      item.updatedAt = new Date();
    }


    this.rePrSvc.sendToLineWh(saveData).subscribe(
      response => {
        this.isOpenSendToLineWhModal = false
      },
      error => {
        this.isOpenSendToLineWhModal = false
      }
    )
    


  }
}
