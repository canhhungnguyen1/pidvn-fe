import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';
import { SparePartRecordVo } from '../models/SparePartRecordVo';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  DxDataGridComponent,
  DxTextBoxComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { environment } from 'src/environments/environment';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { SparePartRequestsService } from '../spare-part-requests/spare-part-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-spare-part-in-out',
  templateUrl: './spare-part-in-out.component.html',
  styleUrls: ['./spare-part-in-out.component.scss'],
})
export class SparePartInOutComponent implements OnInit, AfterViewInit {
  // @ViewChild(DxTextBoxComponent, { static: false }) userCodeIpt!: DxTextBoxComponent;
  @ViewChild('userCodeIpt') userCodeIpt!: ElementRef;
  @ViewChild('sparePartQrCodeIpt') sparePartQrCodeIpt!: ElementRef;

  @ViewChild(DxDataGridComponent, { static: false })
  sparePartOutputGrid!: DxDataGridComponent;

  @ViewChild('validatorChangeRack', { static: false })
  validatorChangeRack!: DxValidationGroupComponent;

  @ViewChild('partNumberCrIpt', { static: false })
  partNumberCrIpt!: DxTextBoxComponent;
  @ViewChild('userCodeCrIpt', { static: false })
  userCodeCrIpt!: DxTextBoxComponent;
  baseUrl = environment.baseUrl;

  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService,
    private http: HttpClient,
    private sparePartRequestSvc: SparePartRequestsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    let firstDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    this.searchParams.dateRange = [firstDayOfMonth, new Date()];

    this.getLineStandard();
    this.getMachineStandard();
    this.getSparePartRecords();
    this.getSparePartRequestMasters();

    this.whUserCode = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    // Trường hợp xuất hàng M4 chọn từ màn hình danh sách request
    const requestId =
      this.activatedRoute.snapshot.queryParamMap.get('requestId');
    if (requestId) {
      this.isOpenOutputSparePartModal = true;
      this.goodsType = 'M4';
      this.transactionType = 'OUTPUT';

      // Lấy dữ liệu chi tiết request
      this.getRequestDetail(requestId);

      this.sparePartRequestSvc.getRequests({}).subscribe((response) => {
        this.request = response.find(
          (item: any) => item.id === Number(requestId)
        );

        console.log('Request', this.request);
      });
    }
  }

  ngAfterViewInit(): void {
    // this.cdr.detectChanges();
  }

  searchParams = {
    dateRange: [new Date(), new Date()],
  };

  whUserCode: any;
  sparePartRecords: any;
  isOpenOutputSparePartModal: boolean = false;

  mapSparePartScanned: Map<string, any> = new Map();
  listSparePartScanned: Array<any> = new Array();
  userCode: any;
  insertType: string = 'manual'; // Kiểu insert là manual hay upload bằng excel
  goodsType: any; // Loại hàng user chọn (M4 or M8)
  fromRack: any; // Loại rack
  transactionType: any; // Loại giao dịch: "INPUT | OUTPUT | OK_RETURN | NG_RETURN"

  // Upload Excel: các biến liên quan đến upload file
  uploadExcelApi: any;
  uploading = false;
  fileList: NzUploadFile[] = [];
  uploadResult: any;

  factories = [
    { code: 'RE', name: 'RELAY FACTORY' },
    { code: 'EM', name: 'EMC FACTORY' },
    { code: 'PN', name: 'PIH ENC FACTORY' },
    { code: 'PR', name: 'PIH RE FACTORY' },
    { code: 'SP', name: 'SPEAKER' },
    { code: 'TN', name: 'HFC FACTORY' },
    { code: 'HO', name: 'HEAD OFFICE' },
    { code: 'PC', name: 'PCB FACTORY' },
  ];
  lines: any;
  machines: any;

  // Edit Spare Part record
  isOpenModalEditSparePartRecord: boolean = false;
  sparePartRecordEdit: any = {};

  // Các biến liên quan đến type INPUT (Nhập kho)
  po: any;
  supplier: any;

  sparePartRequestMasters: any; // danh sách request
  sparePartRequestDetails: any; // chi tiết các request

  factoryCode: any; // Factory Selected
  machine: any; // Machine Selected
  line: any; // line Selected
  request: any; // request Selected

  // Biến liên quan chuyển rack
  isOpenModalChangeRack: boolean = false;
  rackChangeInfo: any = {}; // Biến lưu thông tin chuyển rack

  getLineStandard() {
    this.sparePartSvc.getLineStandard().subscribe((response) => {
      this.lines = response;
    });
  }

  getMachineStandard() {
    this.sparePartSvc.getMachineStandard().subscribe((response) => {
      this.machines = response;
    });
  }

  getSparePartRecords() {
    this.sparePartSvc
      .getSparePartRecords(this.searchParams)
      .subscribe((response) => {
        this.sparePartRecords = response;
      });
  }

  openOutputSparePartModal() {
    this.insertType = 'manual';
    this.isOpenOutputSparePartModal = true;
    this.uploadResult = null;
    //this.uploadExcelApi = `${this.baseUrl}/SparePart/UploadExcel?recordType=${this.recordType}`;

    this.mapSparePartScanned = new Map();
    this.listSparePartScanned = new Array();

    setTimeout(() => {
      this.userCodeIpt.nativeElement.focus();
    }, 500);

    // this.userCodeIpt.instance.focus();
  }

  onExportClient(event: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');
    exportDataGrid({
      component: event.component,
      worksheet: worksheet,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'M4M8-History.xlsx'
        );
      });
    });
  }

  scanUserCode(event: any) {
    this.userCode = event.target.value;

    if (this.userCode.length < 7) {
      this.toastr.warning('Mã nhân viên không đúng', 'Warning');
      this.userCodeIpt.nativeElement.select();
      return;
    }

    this.sparePartQrCodeIpt.nativeElement.select();
  }

  scanSparePartQrCode(event: any) {
    if (!this.userCode) {
      this.toastr.warning('Cần scan mã nhân viên', 'Warning');
      this.userCodeIpt.nativeElement.select();
      return;
    }

    if (!this.goodsType) {
      this.toastr.warning('Cần chọn loại hàng', 'Warning');
      return;
    }

    if (!this.transactionType) {
      this.toastr.warning('Cần chọn loại giao dịch', 'Warning');
      return;
    }

    if (!this.fromRack && this.transactionType == 'INPUT') {
      this.toastr.warning('Cần chọn rack hàng', 'Warning');
      return;
    }

    if (this.transactionType === 'OUTPUT' && this.goodsType === 'M4') {
      if (!this.factoryCode) {
        this.toastr.warning('Cần chọn nhà máy', 'Warning');
        return;
      }

      // if (!this.machine) {
      //   this.toastr.warning('Cần chọn Machine', 'Warning');
      //   return;
      // }

      // if (!this.line) {
      //   this.toastr.warning('Cần chọn Line', 'Warning');
      //   return;
      // }

      /**
       * Kiểm tra dữ liệu scan có trong request không
       */
      // if (
      //   !this.sparePartRequestDetails.some(
      //     (item: any) =>
      //       item.partNumber.toUpperCase().trim() ===
      //       event.target.value.toUpperCase().trim()
      //   )
      // ) {
      //   this.toastr.warning('Mã không có trong request', 'Warning');
      //   return
      // }
    }

    let obj = Object.assign({
      whUserCode: this.whUserCode,
      date: new Date(),
      receiveUserCode: this.userCode,
      partNumber: event.target.value.toUpperCase().trim(),
      qty: 0,
      line: this.line,
      machine: this.machine,
      factoryCode: this.factoryCode,
      insertType: this.insertType,
      requestNo: this.request ? this.request.requestNo : null,
      userCode: this.userCode,
      goodsType: this.goodsType,
      fromRack: this.fromRack,
      type: this.transactionType,
      po: this.po,
      supplier: this.supplier,
    });
    console.log(obj);

    this.listSparePartScanned.push(obj);
    this.listSparePartScanned.reverse();
    this.sparePartQrCodeIpt.nativeElement.select();
  }

  cancelSaveOutputSparePart() {
    this.isOpenOutputSparePartModal = false;
    this.resetInputForm();
    this.router.navigate(['/admin/spare-part/spare-part-in-out']);
    // this.getSparePartRecords();
  }

  /**
   * Xóa giá trị các ô input
   */
  resetInputForm() {
    this.userCode = null;
    this.po = null;
    this.supplier = null;
    this.transactionType = null;
    this.goodsType = null;
    this.fromRack = null;
    this.factoryCode = null;
    this.machine = null;
    this.line = null;
    this.request = null;
  }

  async saveSparePartRecords(event: any) {
    let arr = new Array();

    await event.changes.forEach((item: any) => {
      arr.push(item.key);
    });

    /**
     * TODO: Push server to save
     */
    this.sparePartSvc.saveSparePartRecords(arr).subscribe((response) => {
      this.getSparePartRecords();
      this.isOpenOutputSparePartModal = false;
      this.toastr.success('OK', ' Lưu thành công');
      this.resetInputForm();
      this.router.navigate(['/admin/spare-part/spare-part-in-out']);
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUploadExcel(): void {
    const formData = new FormData();

    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    this.uploading = true;

    const req = new HttpRequest('POST', this.uploadExcelApi, formData, {
      // reportProgress: true
    });

    this.http
      .request(req)
      .pipe(filter((e) => e instanceof HttpResponse))
      .subscribe(
        (response: any) => {
          this.uploading = false;
          console.log('RESPONSE UPLOAD: ', response);
          this.fileList = [];
          this.uploadResult = response.body;
        },
        () => {
          this.uploading = false;
        }
      );
  }

  // Edit SparePart record
  openModalEditSparePartRecord(item: any) {
    console.log(item);

    this.sparePartRecordEdit = item;
    this.isOpenModalEditSparePartRecord = true;

    console.log(this.sparePartRecordEdit);
  }

  onEditSparePartRecord() {
    console.log(this.sparePartRecordEdit);

    let obj = {
      id: this.sparePartRecordEdit.id,
      partNumber: this.sparePartRecordEdit.partNumber.toUpperCase(),
      qty: this.sparePartRecordEdit.qty,
      factoryCode: this.sparePartRecordEdit.factoryCode,
      line: this.sparePartRecordEdit.line,
      machine: this.sparePartRecordEdit.machineId,
      remark: this.sparePartRecordEdit.remark,
      receiveUserCode: this.sparePartRecordEdit.receiveUserCode.trim(),
    };

    this.sparePartSvc.updateSparePartRecord(obj).subscribe((response) => {
      this.isOpenModalEditSparePartRecord = false;
      this.getSparePartRecords();
    });
  }

  onDeleteSparePartRecord() {
    let id = this.sparePartRecordEdit.id;
    this.sparePartSvc.deleteSparePartRecord(id).subscribe((response) => {
      this.isOpenModalEditSparePartRecord = false;
      this.getSparePartRecords();
    });
  }

  /**
   *
   * @param event Chọn loại hàng M4 or M8
   */
  changeGoodsType(event: any) {
    console.log('changeGoodsType: ', event);
    this.goodsType = event.value;
    this.sparePartQrCodeIpt.nativeElement.select();
  }

  /**
   * Chọn Rack
   * @param event 
   */
  changeRack(event: any) {
    console.log('Chọn Rack: ', event);
    this.fromRack = event.value;
    this.sparePartQrCodeIpt.nativeElement.select();
  }

  /**
   *
   * @param event Chọn loại giao dịch
   */
  changeTransactionType(event: any) {
    console.log('changeTransactionType: ', event);
    this.transactionType = event.value;

    this.sparePartQrCodeIpt.nativeElement.select();

    this.sparePartRequestDetails = new Array();
    this.mapSparePartScanned = new Map();
    this.listSparePartScanned = new Array();
  }

  /**
   * Lấy danh sách các request spare part
   */

  getSparePartRequestMasters() {
    this.sparePartRequestSvc.getRequests({}).subscribe((response) => {
      this.sparePartRequestMasters = response;
    });
  }

  /**
   * Lấy danh sách các part trong request
   */
  getSparePartRequestDetails(event: any) {
    const selectedItem = event.component.option('selectedItem');
    this.request = selectedItem;

    console.log('getSparePartRequestDetails', this.request);

    this.getRequestDetail(selectedItem.id);
  }

  getRequestDetail(requestId: any) {
    this.sparePartRequestSvc
      .getRequestDetail(requestId)
      .subscribe((response) => {
        this.sparePartRequestDetails = response;
      });
  }

  data_rack = [
    { id: 'R1-A-1', name: 'R1-A-1' },
    { id: 'R1-A-2', name: 'R1-A-2' },
    { id: 'R1-A-3', name: 'R1-A-3' },
    { id: 'R1-A-4', name: 'R1-A-4' },
    { id: 'R1-B-1', name: 'R1-B-1' },
    { id: 'R1-B-2', name: 'R1-B-2' },
    { id: 'R1-B-3', name: 'R1-B-3' },
    { id: 'R1-B-4', name: 'R1-B-4' },
    { id: 'R1-C-1', name: 'R1-C-1' },
    { id: 'R1-C-2', name: 'R1-C-2' },
    { id: 'R1-C-3', name: 'R1-C-3' },
    { id: 'R1-C-4', name: 'R1-C-4' },
    { id: 'R1-D-1', name: 'R1-D-1' },
    { id: 'R1-D-2', name: 'R1-D-2' },
    { id: 'R1-D-3', name: 'R1-D-3' },
    { id: 'R2-A-1', name: 'R2-A-1' },
    { id: 'R2-A-2', name: 'R2-A-2' },
    { id: 'R2-A-3', name: 'R2-A-3' },
    { id: 'R2-A-4', name: 'R2-A-4' },
    { id: 'R2-B-1', name: 'R2-B-1' },
    { id: 'R2-B-2', name: 'R2-B-2' },
    { id: 'R2-B-3', name: 'R2-B-3' },
    { id: 'R2-B-4', name: 'R2-B-4' },
    { id: 'R2-C-1', name: 'R2-C-1' },
    { id: 'R2-C-2', name: 'R2-C-2' },
    { id: 'R2-C-3', name: 'R2-C-3' },
    { id: 'R2-C-4', name: 'R2-C-4' },
    { id: 'R3-A-1', name: 'R3-A-1' },
    { id: 'R3-A-2', name: 'R3-A-2' },
    { id: 'R3-A-3', name: 'R3-A-3' },
    { id: 'R3-A-4', name: 'R3-A-4' },
    { id: 'R3-B-1', name: 'R3-B-1' },
    { id: 'R3-B-2', name: 'R3-B-2' },
    { id: 'R3-B-3', name: 'R3-B-3' },
    { id: 'R3-B-4', name: 'R3-B-4' },
    { id: 'R3-C-1', name: 'R3-C-1' },
    { id: 'R3-C-2', name: 'R3-C-2' },
    { id: 'R3-C-3', name: 'R3-C-3' },
    { id: 'R3-C-4', name: 'R3-C-4' },
    { id: 'R3-D-1', name: 'R3-D-1' },
    { id: 'R3-D-2', name: 'R3-D-2' },
    { id: 'R3-D-3', name: 'R3-D-3' },
    { id: 'R3-D-4', name: 'R3-D-4' },
    { id: 'R4-A-1', name: 'R4-A-1' },
    { id: 'R4-A-2', name: 'R4-A-2' },
    { id: 'R4-A-3', name: 'R4-A-3' },
    { id: 'R4-B-1', name: 'R4-B-1' },
    { id: 'R4-B-2', name: 'R4-B-2' },
    { id: 'R4-B-3', name: 'R4-B-3' },
    { id: 'R4-C-1', name: 'R4-C-1' },
    { id: 'R4-C-2', name: 'R4-C-2' },
    { id: 'R4-C-3', name: 'R4-C-3' },
    { id: 'R5-A-1', name: 'R5-A-1' },
    { id: 'R5-A-2', name: 'R5-A-2' },
    { id: 'R5-A-3', name: 'R5-A-3' },
    { id: 'R5-A-4', name: 'R5-A-4' },
    { id: 'R5-B-1', name: 'R5-B-1' },
    { id: 'R5-B-2', name: 'R5-B-2' },
    { id: 'R5-B-3', name: 'R5-B-3' },
    { id: 'R5-C-1', name: 'R5-C-1' },
    { id: 'R5-C-2', name: 'R5-C-2' },
    { id: 'R5-C-3', name: 'R5-C-3' },
    { id: 'R6-A-1', name: 'R6-A-1' },
    { id: 'R6-A-2', name: 'R6-A-2' },
    { id: 'R6-A-3', name: 'R6-A-3' },
    { id: 'R6-B-1', name: 'R6-B-1' },
    { id: 'R6-B-2', name: 'R6-B-2' },
    { id: 'R6-B-3', name: 'R6-B-3' },
    { id: 'R6-C-1', name: 'R6-C-1' },
    { id: 'R6-C-2', name: 'R6-C-2' },
    { id: 'R6-C-3', name: 'R6-C-3' },
    { id: 'T1-A-1', name: 'T1-A-1' },
    { id: 'T1-A-2', name: 'T1-A-2' },
    { id: 'T1-A-3', name: 'T1-A-3' },
    { id: 'T1-B-1', name: 'T1-B-1' },
    { id: 'T1-B-2', name: 'T1-B-2' },
    { id: 'T1-B-3', name: 'T1-B-3' },
    { id: 'T1-C-1', name: 'T1-C-1' },
    { id: 'T1-C-2', name: 'T1-C-2' },
    { id: 'T1-C-3', name: 'T1-C-3' },
    { id: 'PIH-R1-A-1', name: 'PIH-R1-A-1' },
    { id: 'PIH-R1-A-2', name: 'PIH-R1-A-2' },
    { id: 'PIH-R1-A-3', name: 'PIH-R1-A-3' },
    { id: 'PIH-R1-A-4', name: 'PIH-R1-A-4' },
    { id: 'PIH-R1-B-1', name: 'PIH-R1-B-1' },
    { id: 'PIH-R1-B-2', name: 'PIH-R1-B-2' },
    { id: 'PIH-R1-B-3', name: 'PIH-R1-B-3' },
    { id: 'PIH-R1-B-4', name: 'PIH-R1-B-4' },
    { id: 'PIH-R1-C-1', name: 'PIH-R1-C-1' },
    { id: 'PIH-R1-C-2', name: 'PIH-R1-C-2' },
    { id: 'PIH-R1-C-3', name: 'PIH-R1-C-3' },
    { id: 'PIH-R1-C-4', name: 'PIH-R1-C-4' },
    { id: 'PIH-R2-A-1', name: 'PIH-R2-A-1' },
    { id: 'PIH-R2-A-2', name: 'PIH-R2-A-2' },
    { id: 'PIH-R2-A-3', name: 'PIH-R2-A-3' },
    { id: 'PIH-R2-A-4', name: 'PIH-R2-A-4' },
    { id: 'PIH-R2-B-1', name: 'PIH-R2-B-1' },
    { id: 'PIH-R2-B-2', name: 'PIH-R2-B-2' },
    { id: 'PIH-R2-B-3', name: 'PIH-R2-B-3' },
    { id: 'PIH-R2-B-4', name: 'PIH-R2-B-4' },
    { id: 'PIH-R2-C-1', name: 'PIH-R2-C-1' },
    { id: 'PIH-R2-C-2', name: 'PIH-R2-C-2' },
    { id: 'PIH-R2-C-3', name: 'PIH-R2-C-3' },
    { id: 'PIH-R2-C-4', name: 'PIH-R2-C-4' },
    { id: 'PIH-E-R1-B-1', name: 'PIH-E-R1-B-1' },
    { id: 'PIH-E-R1-B-2', name: 'PIH-E-R1-B-2' },
    { id: 'PIH-E-R1-B-3', name: 'PIH-E-R1-B-3' },
    { id: 'PIH-E-R2-A-1', name: 'PIH-E-R2-A-1' },
    { id: 'PIH-E-R2-A-2', name: 'PIH-E-R2-A-2' },
    { id: 'PIH-E-R2-A-3', name: 'PIH-E-R2-A-3' },
    { id: 'PIH-E-R2-A-4', name: 'PIH-E-R2-A-4' },
    { id: 'PIH-E-R2-B-1', name: 'PIH-E-R2-B-1' },
    { id: 'PIH-E-R2-B-2', name: 'PIH-E-R2-B-2' },
    { id: 'PIH-E-R2-B-3', name: 'PIH-E-R2-B-3' },
    { id: 'PIH-E-R2-B-4', name: 'PIH-E-R2-B-4' },
    { id: 'PIH-E-R2-C-1', name: 'PIH-E-R2-C-1' },
    { id: 'PIH-E-R2-C-2', name: 'PIH-E-R2-C-2' },
    { id: 'PIH-E-R2-C-3', name: 'PIH-E-R2-C-3' },
  ];

  /**
   * Code Change Rack
   */

  openModalChangeRack() {
    this.rackChangeInfo = {};
    this.isOpenModalChangeRack = true;

    this.mapSparePartScanned = new Map();
    this.listSparePartScanned = new Array();

    setTimeout(() => {
      this.userCodeCrIpt?.instance?.focus();
    }, 500);
  }

  /**
   * Scan chuyển RACK
   * @param type USER_CODE: mã nhân viên, PART_NUMBER: mã tool/jig
   * @param event
   * @returns
   */
  scanChangeRack(type: string, event: any) {
    // Scan UserCode
    if (type === 'USER_CODE') {
      console.log('Mã nhân viên:', event.target.value);
      this.rackChangeInfo.userCode = event.target.value

      // Focus sang ô nhập Part Number
      this.partNumberCrIpt?.instance?.focus();
      this.selectTextInput('partNumberCrIpt')

      return;
    }

    // Scan Partnumber
    if (type === 'PART_NUMBER') {
      console.log('Mã PART_NUMBER:', event.target.value);

      if (!this.rackChangeInfo.userCode) {
        this.toastr.warning('Cần scan mã nhân viên','Warning')
        this.userCodeCrIpt?.instance?.focus();
        return
      }

      if (!this.rackChangeInfo.goodsType) {
        this.toastr.warning('Cần chọn loại hàng','Warning')
        this.selectTextInput('partNumberCrIpt')
        return
      }


      let obj = Object.assign({
        whUserCode: this.rackChangeInfo.userCode,
        partNumber: event.target.value.toUpperCase().trim(),
        date: new Date(),
        qty: 0,
        type: 'CHANGE_RACK',  // Change Rack
        fromRack: null,
        toRack:null,
        remark: null,
        goodsType: this.rackChangeInfo.goodsType
      });
      console.log(obj);
  
      this.listSparePartScanned.push(obj);
      this.listSparePartScanned.reverse();
      this.selectTextInput('partNumberCrIpt')
      return;
    }

    // Chọn loại hàng
    if (type === 'GOODS_TYPE') {
      this.rackChangeInfo.goodsType = event.value
      this.selectTextInput('partNumberCrIpt')
      return;
    }

  }

  selectTextInput(input: string) {
    if (input === 'userCodeCrIpt') {
      const inputElement = this.userCodeCrIpt.instance
        .element()
        .querySelector('input');
      if (inputElement) {
        inputElement.select();
        return;
      }
    }

    if (input === 'partNumberCrIpt') {
      const inputElement = this.partNumberCrIpt.instance
        .element()
        .querySelector('input');
      if (inputElement) {
        inputElement.select();
        return;
      }
    }
  }

  async saveChangeRack(event: any) {

    let arr = new Array();

    await event.changes.forEach((item: any) => {
      arr.push(item.data);
    });

    console.log('SAVE CHANGE RACK: ', arr);

    this.sparePartSvc.changeRack(arr).subscribe((response) => {
      this.toastr.success('Đã lưu lại lịch sử chuyển Rack', 'Notification');
      this.isOpenModalChangeRack = false;
      this.getSparePartRecords();
      this.router.navigate(['/admin/spare-part/spare-part-in-out']);
    });
  }

  // Style header
  onCellPreparedHistory(e: any) {
    if (e.rowType === 'header') {
      e.cellElement.style.backgroundColor = '#000080'; // Change background color
      e.cellElement.style.color = '#ffffff'; // Change text color for better visibility
      e.cellElement.style.fontWeight = 'bold';
    }
  }
}
