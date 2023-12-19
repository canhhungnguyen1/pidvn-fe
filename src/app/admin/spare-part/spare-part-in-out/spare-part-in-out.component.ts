import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';
import { SparePartRecordVo } from '../models/SparePartRecordVo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent } from 'devextreme-angular';
import { environment } from 'src/environments/environment';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-spare-part-in-out',
  templateUrl: './spare-part-in-out.component.html',
  styleUrls: ['./spare-part-in-out.component.scss'],
})
export class SparePartInOutComponent implements OnInit {
  @ViewChild('userCodeIpt') userCodeIpt!: ElementRef;
  @ViewChild('sparePartQrCodeIpt') sparePartQrCodeIpt!: ElementRef;

  @ViewChild(DxDataGridComponent, { static: false })
  sparePartOutputGrid!: DxDataGridComponent;

  baseUrl = environment.baseUrl;

  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    let firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.searchParams.dateRange = [firstDayOfMonth, new Date()]


    this.getLineStandard();
    this.getMachineStandard();
    this.getSparePartRecords();


    this.whUserCode = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
  }

  searchParams = {
    dateRange: [new Date(), new Date()]
  }

  whUserCode: any;
  sparePartRecords: any;
  isOpenOutputSparePartModal: boolean = false;

  mapSparePartScanned: Map<string, any> = new Map();
  listSparePartScanned: Array<any> = new Array();
  userCode: any;
  recordType: any; // Biến này xác định kiểu scan là nhập hay xuất
  insertType: string = 'manual'; // Kiểu insert là manual hay upload bằng excel

  // Upload Excel: các biến liên quan đến upload file
  uploadExcelApi: any;
  uploading = false;
  fileList: NzUploadFile[] = [];
  uploadResult: any;

  factories = [
    {code: 'TN', name: 'HFC FACTORY'},
    {code: 'SP', name: 'SPEAKER'},
    {code: 'HO', name: 'HEAD OFFICE'},
    {code: 'EM', name: 'EMC FACTORY'},
    {code: 'PC', name: 'PCB FACTORY'},
    {code: 'RE', name: 'RELAY FACT'},
    {code: 'PN', name: 'PIH ENC FACTORY'},
    {code: 'PR', name: 'PIH RE FACTORY'}
  ]
  lines: any;
  machines: any;

  getLineStandard() {
    this.sparePartSvc.getLineStandard().subscribe(
      response => {
        this.lines = response
      }
    )
  }

  getMachineStandard() {
    this.sparePartSvc.getMachineStandard().subscribe(
      response => {
        this.machines = response;
      }
    )
  }

  getSparePartRecords() {
    this.sparePartSvc.getSparePartRecords(this.searchParams).subscribe((response) => {
      this.sparePartRecords = response;
    });
  }

  openOutputSparePartModal() {
    this.insertType = 'manual';
    this.isOpenOutputSparePartModal = true;
    this.recordType = 'OUT';
    this.uploadResult = null;
    this.uploadExcelApi = `${this.baseUrl}/SparePart/UploadExcel?recordType=${this.recordType}`;

    this.mapSparePartScanned = new Map();
    this.listSparePartScanned = new Array();

    setTimeout(() => {
      this.userCodeIpt.nativeElement.focus();
    }, 500);
  }

  onExportClient(event: any) {}

  scanUserCode(event: any) {
    this.userCode = event.target.value;

    if (this.userCode.length < 7) {
      this.toastr.warning('Cần scan mã nhân viên','Warning')
      this.userCodeIpt.nativeElement.select();
      return;
    }


    this.sparePartQrCodeIpt.nativeElement.select();
  }

  scanSparePartQrCode(event: any) {

    const date = new Date();

    if (this.userCode === undefined || this.userCode === '') {
      this.toastr.warning('Cần scan mã nhân viên','Warning')
      this.userCodeIpt.nativeElement.select();
      return
    }

    let obj = Object.assign({
      whUserCode: this.whUserCode,
      date: new Date(),
      receiveUserCode: this.recordType == 'OUT' ? this.userCode : null,
      partNumber: event.target.value.trim(),
      recordType: this.recordType,
      qty: 1,
      line: '',
      machine: '',
      type: this.recordType,
      insertType: this.insertType,
      requestNo: `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
    });

    this.mapSparePartScanned.set(obj.partNumber, obj);
    this.listSparePartScanned = Array.from(
      this.mapSparePartScanned.values()
    ).reverse();

    console.log('listSparePartScanned: ', this.listSparePartScanned);
    this.sparePartQrCodeIpt.nativeElement.select();
  }

  cancelSaveOutputSparePart() {
    this.isOpenOutputSparePartModal = false;
    this.getSparePartRecords();
  }

  async saveSparePartRecords(event: any) {

    let arr = new Array();

    await event.changes.forEach((item: any) => {
      arr.push(item.key);
    });
    console.log('Arr: ', arr);

    /**
     * TODO: Push server to save
     */

    this.sparePartSvc.saveSparePartRecords(arr).subscribe((response) => {
      this.getSparePartRecords();
      this.isOpenOutputSparePartModal = false;
      this.toastr.success('OK', ' Lưu thành công');
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
}
