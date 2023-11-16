import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../../services/spare-part.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-spare-part-ivt-req-detail',
  templateUrl: './spare-part-ivt-req-detail.component.html',
  styleUrls: ['./spare-part-ivt-req-detail.component.scss'],
})
export class SparePartIvtReqDetailComponent implements OnInit, AfterViewInit {
  
  @ViewChild(DxDataGridComponent, { static: false })
  ivtDataGrid!: DxDataGridComponent;

  @ViewChild('labelIpt') labelIpt!: ElementRef;
  @ViewChild('qtyIpt') qtyIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;

  baseUrl = environment.baseUrl;

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService,
    private http: HttpClient
  ) {}

  requestId: any;
  requestNo: any;
  inventoryRequest: any;
  inventoryData: any;
  isOpenScanInventoryModal: boolean = false;
  isOpenModalUploadExcelInventory: boolean = false


  isLoadingSaveInventoryData: boolean = false;
  uploading = false;
  fileList: NzUploadFile[] = [];
  uploadExcelApi: any;
  uploadResult: any;
  
  
  mapPartsScanned: Map<string, any> = new Map();
  listPartsScanned: Array<any> = new Array();

  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.params['id']);
    this.requestNo = this.activatedRoute.snapshot.queryParamMap.get('reqNo');
    this.getInventoryRequest(this.requestId);
  }

  ngAfterViewInit(): void {
    this.getInventoryData(this.requestId);
  }


  getInventoryRequest(requestId: number) {
    this.sparePartSvc.getInventoryRequest(requestId).subscribe(
      response => {
        this.inventoryRequest = response
      }
    )
  }

  openScanInventoryModal() {
    /**
     * Kiểm tra phiếu đã quá thời gian kiểm kê chưa
     * Đang để lớn hơn 5 ngày sẽ không cho kiểm kê
     */
    let reqDateStr = this.requestNo.split('-')[1];
    let pattern = /(\d{4})(\d{2})(\d{2})/;
    let reqDate = new Date(reqDateStr.replace(pattern, '$1-$2-$3'));
    let curDate = new Date();
    const diffTime = Math.abs(reqDate.getTime() - curDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 5) {
      this.toastr.warning('Đã quá thời gian kiểm kê', 'Warning');
      return;
    }


    this.isOpenScanInventoryModal = true;

    setTimeout(() => {
      this.labelIpt.nativeElement.focus()
    }, 500)




  }

  closeScanInventoryModal() {
    this.isOpenScanInventoryModal = false;
  }

  getInventoryData(requestId: any) {

    let name = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).FullName.split(' ').reverse()[0]

    this.ivtDataGrid?.instance.beginCustomLoading(
      `Bạn ${name} ơi đợi tý nhé! \n Hệ thống đang lấy dữ liệu`
    );

    this.sparePartSvc.getInventoryData(requestId).subscribe(
      response => {
        this.inventoryData = response
        this.ivtDataGrid.instance.endCustomLoading();
      }
    )
  }

  scanLabel(event: any) { 
    this.qtyIpt.nativeElement.focus()
  }

  openModalUploadExcelInventory() {
    this.isOpenModalUploadExcelInventory = true;
    this.uploadExcelApi = `${this.baseUrl}/SparePart/Inventory/UploadExcel?requestId=${this.requestId}`;
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
