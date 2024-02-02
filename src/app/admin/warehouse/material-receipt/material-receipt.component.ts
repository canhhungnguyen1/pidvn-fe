import { Component, HostListener, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { MaterialVo } from './models/MaterialVo';
import { PurWhRecordsSearchVo } from './models/PurWhRecordsSearchVo';
import { PurWhRecordsVo } from './models/PurWhRecordsVo';
import { MaterialReceiptService } from './services/material-receipt.service';

@Component({
  selector: 'app-material-receipt',
  templateUrl: './material-receipt.component.html',
  styleUrls: ['./material-receipt.component.scss'],
})
export class MaterialReceiptComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private jwtHelperService: JwtHelperService,
    private materialReceiptService: MaterialReceiptService
  ) {}

  qrCode!: string;
  isQrInValid: boolean = false;
  isLoading: boolean = false;

  listBoxScanned: Array<any> = new Array();
  mapBoxScanned: Map<string, MaterialVo> = new Map();
  totalBoxScanned: number = 0;
  totalQtyScanned: number = 0;
  totalQtySearch: number = 0;
  recordTotal: number = 0;

  isShowErrorModal: boolean = false;
  isShowResponseModal: boolean = false;
  isShowBigBoxDetailModal: boolean = false;
  errorMessage!: string;
  responseMessage: any;

  purWhRecords!: Array<PurWhRecordsVo>;
  searchVo: PurWhRecordsSearchVo = {
    model: null,
    lotNo: null,
    whUserCode: null,
    currentPage: 1,
    recordPerPage: 10,
    recordStart: 0,
    recordTotal: 50,
    fromDate: null,
    toDate: null,
    slipNo: null,
    invoice: null,
  };

  invoiceInput: any = '';
  poInput: any;
  slipInput: any;

  // Đối với tem thùng to
  listBigBoxScanned: Array<any> = new Array();
  mapBigBoxScanned: Map<string, any> = new Map();
  listBigBoxDetail: Array<any> = new Array();
  totalQtyDetailBigBox: number = 0;
  loadingBtnSaveBigBox = false;

  invoiceDetails: any; // biến này để check dữ liệu sau khi nhập kho theo Invoice

  ngOnInit(): void {
    //this.getMaterials(this.searchVo);
  }

  /**
   * Xử lý khi bắn QR code
   * @param event
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('AAAAA');
    if (event.keyCode == 13) {
      if (!this.qrCode) {
        return;
      }
      let result: string[] = this.qrCode.split(';');

      if (result[0].trim() == 'B' || result[0].trim() == 'b') {
        console.log('Scan big box: ', result);
        console.log('QR Code: ', this.qrCode);

        this.mapBigBoxScanned.set(this.qrCode, {
          key: this.qrCode.toUpperCase(),
          value: this.qrCode.toUpperCase(),
        });
        this.listBigBoxScanned = Array.from(this.mapBigBoxScanned.values());
        this.totalBoxScanned = this.listBigBoxScanned.length;
        this.qrCode = '';
      } else {
        let material = new MaterialVo();

        // Xử lý với NVL của Elektrisola
        if (result[4] === '21010284') {
          this.handleElektrisolaVendor(material, result);
        } else {
          material.key = result[3];
          material.model = result[0];
          material.qty = parseFloat(result[2]);
          material.lotNo = result[3];
          material.vendorCode = result[4];
          material.serial = result[5];
          // material.invoiceNo = result[6];
          material.invoiceNo = this.invoiceInput.toUpperCase();
          material.poNo = result[7];
          material.poSeq = result[8];
          material.slipNo = this.slipInput.toUpperCase();
          material.qrCode = this.qrCode;
          material.lotGroup = result[3];

          material.whUserCode = this.jwtHelperService.decodeToken(
            localStorage.getItem('accessToken')?.toString()
          ).Username;
        }

        this.mapBoxScanned.set(`${material.key}`, material);

        this.listBoxScanned = Array.from(this.mapBoxScanned.values());

        this.totalBoxScanned = this.listBoxScanned.length;

        this.totalQtyScanned = this.sumBoxQtyScanned();

        this.qrCode = '';
      }

      console.log('aaa : ', this.listBigBoxScanned);
    }
  }

  /**
   * Xử lý đối với NVL của Electric Sola
   * @param material
   * @param resultQr
   */
  handleElektrisolaVendor(material: MaterialVo, resultQr: string[]) {
    // Xử lý đối với NVL Elektrisola => key = LotNo*Serial
    material.key = `${resultQr[3]}*${resultQr[5]}`;
    material.model = resultQr[0];
    material.qty = parseFloat(resultQr[2]);
    material.lotNo = `${resultQr[3]}${resultQr[5]}`;
    material.vendorCode = resultQr[4];
    material.serial = resultQr[5];
    material.invoiceNo = this.invoiceInput
      ? this.invoiceInput.toUpperCase()
      : null;
    material.poNo = this.poInput;
    material.slipNo = this.slipInput ? this.slipInput.toUpperCase() : null;
    material.qrCode = this.qrCode;
    material.lotGroup = resultQr[3];
    material.whUserCode = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
  }

  /**
   * Xóa data đã scan
   * @param data
   */
  deleteScannedData(data: any) {
    this.mapBoxScanned.delete(data.key);
    this.listBoxScanned = Array.from(this.mapBoxScanned.values());
    this.totalBoxScanned = this.listBoxScanned.length;
    this.totalQtyScanned = this.sumBoxQtyScanned();
  }

  saveData() {
    if (this.invoiceInput == '' || this.slipInput == '') {
      this.toastr.warning('Cần nhập số Invoice và Slip');
      return;
    }
    this.isLoading = true;
    console.log('Save Data: ', this.listBoxScanned);

    // Insert slip_no vào bảng pur_wh_header
    let header = {
      regNo: this.slipInput,
      type: 'IM',
      userId: this.jwtHelperService.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).UserId,
    };
    this.materialReceiptService
      .createPurWhHeader(header)
      .subscribe((response) => {
        this.materialReceiptService.saveMaterial(this.listBoxScanned).subscribe(
          (response) => {
            this.toastr.success('Lưu thành công !', 'Success');
            this.isLoading = false;
            this.responseMessage = response;
            this.isShowResponseModal = true;
            this.invoiceInput = '';
            this.poInput = '';
            this.slipInput = '';
            this.resetData();
            this.getMaterials(this.searchVo);
          },
          (error) => {
            this.isLoading = false;
            this.errorMessage = error;
            this.isShowErrorModal = true;
          }
        );
      });
  }

  getMaterials(searchVo: PurWhRecordsSearchVo) {
    this.isLoading = true;
    this.materialReceiptService.getMaterials(searchVo).subscribe((response) => {
      console.log('PurWhRecords: ', response);
      this.purWhRecords = response.data;
      this.searchVo.recordTotal = response.recordTotal;
      this.totalQtySearch = response.totalQty;
      this.recordTotal = response.recordTotal;
      this.isLoading = false;
    });
  }

  /**
   * Tính tổng số Qty
   * @returns
   */
  sumBoxQtyScanned(): number {
    let sum = 0;
    this.listBoxScanned.forEach((e) => {
      sum += e.qty;
    });
    return sum;
  }

  resetData() {
    this.mapBoxScanned = new Map();
    this.listBoxScanned = new Array();
    this.listBigBoxScanned = new Array();
    this.mapBigBoxScanned = new Map();
    this.listBigBoxDetail = new Array();
    this.totalBoxScanned = 0;
    this.totalQtyScanned = 0;
    this.totalQtyDetailBigBox = 0;
    this.qrCode = '';
  }

  clearQrCode() {
    this.qrCode = '';
    this.isQrInValid = false;
  }

  playErrorSound() {
    console.log('Playing Sound');
    let audio = new Audio();
    audio.src = '../../../../../assets/sounds/ErrorSound.mp3';
    audio.load();
    audio.play();
  }

  // Pagination
  nzPageIndexChange($event: any) {
    console.log('nzPageIndexChange => ', $event);
    this.searchVo.currentPage = $event;
    this.pagingCalculate(this.searchVo);
  }

  nzPageSizeChange($event: any) {
    console.log('nzPageSizeChange => ', $event);
    this.searchVo.recordPerPage = $event;
    this.pagingCalculate(this.searchVo);
  }

  pagingCalculate(searchVo: PurWhRecordsSearchVo) {
    let recordStart = (searchVo.currentPage - 1) * searchVo.recordPerPage;
    searchVo.recordStart = recordStart;

    this.getMaterials(this.searchVo);
  }

  // Handle date picker
  onChange(result: any): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  onOk(result: any | Date[] | null): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  onCalendarChange(result: Array<Date | null>): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  searchData() {
    this.getMaterials(this.searchVo);
  }

  // Scan Thùng To
  deleteBigBoxScanned(data: any) {
    this.mapBigBoxScanned.delete(data.key);
    this.listBigBoxScanned = Array.from(this.mapBigBoxScanned.values());
    this.totalBoxScanned = this.listBigBoxScanned.length;
  }

  showDetailBigBox() {
    this.isLoading = true;
    let arr = new Array();

    this.listBigBoxScanned.forEach((e) => {
      let lots = e.value.split(';');
      lots.shift();
      lots.shift();
      lots.forEach((item: any) => {
        arr.push(`${item}`);
      });
    });

    this.materialReceiptService
      .getDetailOuterLabel(arr)
      .subscribe((response) => {
        this.isShowBigBoxDetailModal = true;
        this.listBigBoxDetail = response;
        console.log('Detail Big Box: ', this.listBigBoxDetail);

        this.listBigBoxDetail.forEach((e) => {
          this.totalQtyDetailBigBox += e.qty;
        });
        this.isLoading = false;
      });
  }

  saveBigBox() {
    this.loadingBtnSaveBigBox = true;
    if (this.invoiceInput == '' || this.slipInput == '') {
      this.toastr.warning('Cần nhập số Invoice và Slip');
      this.loadingBtnSaveBigBox = false;
      return;
    }

    let arr = new Array();

    console.log('this.listBigBoxDetail: ', this.listBigBoxDetail);

    let dataSave = new Array();

    this.listBigBoxDetail.forEach((e) => {
      let materialVo = new MaterialVo();
      materialVo.lotNo = e.lotNo;
      materialVo.qty = e.qty;
      materialVo.model = e.model;
      materialVo.invoiceNo = e.invoice;
      materialVo.slipNo = this.slipInput ? this.slipInput.toUpperCase() : null;
      materialVo.whUserCode = this.jwtHelperService.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).Username;
      dataSave.push(materialVo);
    });

    console.log('DATA SAVE: ', dataSave);

    // Insert slip_no vào bảng pur_wh_header
    let header = {
      regNo: this.slipInput,
      type: 'IM',
      userId: this.jwtHelperService.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).UserId,
    };
    this.materialReceiptService
      .createPurWhHeader(header)
      .subscribe((response) => {
        this.materialReceiptService
          .saveBigBox(dataSave, this.invoiceInput)
          .subscribe((response) => {
            console.log(response);
            this.toastr.success('Lưu thành công !', 'Success');
            this.isShowBigBoxDetailModal = false;
            this.responseMessage = response;
            this.isShowResponseModal = true;
            this.invoiceInput = '';
            this.poInput = '';
            this.slipInput = '';
            this.resetData();
            this.getMaterials(this.searchVo);
            this.loadingBtnSaveBigBox = false;
          });
      });
  }

  cancelSaveBigBox() {
    this.totalQtyDetailBigBox = 0;
    this.isShowBigBoxDetailModal = false;
  }

  // Tìm slip theo Invoice

  onSearchSlip() {
    if (!this.invoiceInput) {
      this.toastr.warning('Bạn cần nhập Invoice !');
      return;
    }

    // TODO:
    // Tìm slip theo invoice
    this.materialReceiptService
      .findSlipByInvoice(this.invoiceInput)
      .subscribe((response) => {
        if (!response[0]?.slipNo) {
          this.toastr.warning('Chưa có Slip trong hệ thống !');
          this.slipInput = '';
          return;
        }
        this.slipInput = response[0]?.slipNo;
      });
  }

  deleteRecord(data: any) {
    let employee = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    if (employee != '3011934') {
      this.toastr.warning('Bạn không có quyền xóa !', 'note');
      return;
    }

    let purWhRecordsVo = {
      id: data.id,
      updatedBy: employee,
    };
    console.log('Delete: ', data);

    this.materialReceiptService
      .deleteRecord(purWhRecordsVo)
      .subscribe((response) => {
        this.toastr.success(response.lotNo, 'Đã xóa');
        this.getMaterials(this.searchVo);
      });
  }

  onExportClient(event: any) {}

  checkDataSauNhapKho() {
    this.materialReceiptService
      .getInvoiceDetail(this.searchVo)
      .subscribe((response) => {
        // this.invoiceDetails = response

        // Tạo một đối tượng map để lưu trữ tổng theo từng nhóm
        const groupedSum: any = {};

        // Duyệt qua mỗi phần tử trong mảng dữ liệu và tính tổng cho từng nhóm
        response.forEach((item: any) => {
          if (!groupedSum[item.model]) {
            // Nếu nhóm chưa tồn tại, khởi tạo tổng bằng 0
            groupedSum[item.model] = 0;
          }
          // Cộng giá trị vào tổng của nhóm
          groupedSum[item.model] += item.qty;
        });

        // Chuyển đổi từ map thành mảng nếu cần
        const result = Object.entries(groupedSum).map(([model, qty]) => ({
          model,
          qty,
        }));

        this.invoiceDetails = result;
      });
  }
}
