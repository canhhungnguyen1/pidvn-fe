import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QaOqcService } from '../services/qa-oqc.service';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QaOqcDocumentService } from '../../qa-oqc-document/services/qa-oqc-document.service';
import { PackingOqcRequestService } from 'src/app/admin/packing/packing-oqc-request/services/packing-oqc-request.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx'; // Import thư viện xlsx
import { DxFileUploaderComponent } from 'devextreme-angular';
@Component({
  selector: 'app-qa-oqc-evaluate',
  templateUrl: './qa-oqc-evaluate.component.html',
  styleUrls: ['./qa-oqc-evaluate.component.scss'],
})
export class QaOqcEvaluateComponent implements OnInit {

  @ViewChild('valueIpt') valueIpt!: ElementRef;
  @ViewChild('fileUploader', { static: false }) fileUploader!: DxFileUploaderComponent;
  

  constructor(
    private qaOqcSvc: QaOqcService,
    private qaOqcDocumentSvc: QaOqcDocumentService,
    private activatedRoute: ActivatedRoute,
    private jwtHelperSvc: JwtHelperService,
    private packingOqcRequestSvc: PackingOqcRequestService,
    private toastr: ToastrService,
  ) {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
  }

  baseUrl = environment.baseUrl;
  jwt: any;
  reqNo: any;
  qaCard: any;
  requestStatus: any;
  itemCheck: any
  employee: any;
  requestInfo: any;
  oqcMasterData: any;
  isOpenModalHandleRequest: boolean = false;
  // isShowUploadFileModal: boolean = false;
  uploadFileApi: string = '';
  oqcDataFiles: any;

  documents: any;
  documentsPE: any;

  // isOpenSystemValidate: boolean = false; // hiển thị modal show dữ liệu scan
  // systemValidateData: any

  ngOnInit(): void {
    this.reqNo = this.activatedRoute.snapshot.queryParams['reqNo'];
    this.qaCard = this.activatedRoute.snapshot.queryParams['qaCard'];
    this.requestStatus = this.activatedRoute.snapshot.queryParams['requestStatus'];

    this.getRequestInfo({ reqNo: this.reqNo });
    // this.getOqcMasterData(this.reqNo, this.qaCard);
    this.getOqcDataFiles({ reqNo: this.reqNo })

    this.getDocuments({model: this.qaCard.split('*')[0]});

    this.getDocumentsPE(this.qaCard.split('*')[0]);

    // this.systemValidate(this.qaCard);
    
  }

  // systemValidate(qaCard: string) {
  //   this.qaOqcSvc.systemValidate(qaCard).subscribe(
  //     response => {
  //       this.systemValidateData = response
  //     }
  //   )
  // }

  getOqcMasterData(reqNo: any, qaCard: any) {
    this.qaOqcSvc.getOqcMasterData(reqNo, qaCard).subscribe((response) => {
      this.oqcMasterData = response;
      console.log(this.oqcMasterData);
    });
  }

  getRequestInfo(searchParam: any) {
    this.qaOqcSvc.getOqcRequests(searchParam).subscribe((response) => {
      this.requestInfo = response[0];
      console.log('requestInfo: ', this.requestInfo);
    });
  }

  /**
   * Xử lý khi chuyển tab
   * @param event 
   */
  nzSelectedIndexChange(event: any) {
    console.log(event);
  }

  openUploadFileModal() {
    // this.isShowUploadFileModal = true;
    //this.uploadFileApi = `${this.baseUrl}/QA/OqcCheck/UploadFile?createdBy=${this.jwt.Username}&reqNo=${this.reqNo}`;
    this.isOpenUploadFileModal = true
    this.remark = null
    this.cellValueResult = null
  }

  getOqcDataFiles(searchParam: any) {
    this.qaOqcSvc.getOqcDataFiles(searchParam).subscribe(
      response => {
        this.oqcDataFiles = response

        console.log('DATA FILES: ',this.oqcDataFiles);
        
      }
    )
  }

  closeUploadFileModal() {
    this.getOqcDataFiles({ reqNo: this.reqNo });
    this.getRequestInfo({ reqNo: this.reqNo });
    // this.isShowUploadFileModal = false

  }

  fileClick(item: any) {

    let searchVo = {
      url: `${item.rootFolder}\\${item.reqNo}\\${item.fileName}`
    }

    this.qaOqcSvc.downloadOqcDataFile(searchVo).subscribe((response) => {

      console.log(response);
      

      const blob = new Blob([response], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `${item.fileName}`;
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  getDocuments(filter: any) {
    this.qaOqcDocumentSvc.getDocuments(filter).subscribe(
      response => {
        this.documents = response
      }
    )
  }

  /**
   * Lấy các tài kiệu PE phát hành theo model truyền vào
   * @param model 
   */
  getDocumentsPE(model: string) {
    this.qaOqcDocumentSvc.getDocumentsPE(model).subscribe(
      response => {
        this.documentsPE = response
        console.log('documentsPE: ', response);
        
      }
    )
  }

  previewFile(file: any) {
    console.log(file);
    this.qaOqcDocumentSvc
      .previewFile(file.data)
      .subscribe((responseMessage) => {
        let file = new Blob([responseMessage], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  previewDocumentPE(file: any) {
    console.log(file);
    this.qaOqcDocumentSvc
      .previewDocumentPE(file.data)
      .subscribe((responseMessage) => {
        let file = new Blob([responseMessage], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  downloadDocument(file: any) {
    this.qaOqcDocumentSvc.downloadDocument(file.data).subscribe(response => {

      console.log(response);
      const blob = new Blob([response], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `${file.data.fileName}`;
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    })
  }

  changeRequestStatus(event: any) {

    let obj = {...this.requestInfo}
    obj.requestStatusId = event

    this.packingOqcRequestSvc.updateOqcRequest(obj).subscribe(
      response => {
        this.getRequestInfo({ reqNo: this.reqNo });
        this.toastr.success('Cập nhật thành công','Success')
      }
    )


    
  }



  isOpenUploadFileModal: boolean = false
  cellValueResult: any; // kết quả từ file excel up lên
  remark: any
  isLoading: boolean = false


  // Hàm đọc file Excel khi người dùng chọn
  onFileUploaded(event: any): void {
    const file = event.value[0]; // Lấy file đã chọn
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryString = e.target.result;
        const wb = XLSX.read(binaryString, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const cell = ws['R39'];

        if (cell) {
          this.cellValueResult = cell.v;
        } else {
          this.cellValueResult = 'Không tìm thấy ô R39';
        }

        console.log('Giá trị ô R39:', this.cellValueResult);
      };
      reader.readAsBinaryString(file);
    }
  }

  // Upload file kết quả lên server
  uploadFileResult() {

    // let rate = this.systemValidateData?.dateCodeData[0].rate
    const selectedFile = this.fileUploader.value[0]

    if(!selectedFile) {
      this.toastr.warning('Cần chọn file','Warning')
      return
    }

    // if (rate > 20 && this.cellValueResult === 'OK') {

    //   if(this.remark == null || this.remark == '') {
    //     this.toastr.warning('Cần nhập remark (Rate > 20%)','Warning')
    //     return
    //   }
    // }


    this.isLoading = true;

    let requestInfo = {
      createdBy: this.jwt.Username,
      reqNo: this.reqNo,
      remark: this.remark
    }
    
    this.qaOqcSvc.uploadFileResult(selectedFile, requestInfo).subscribe(
      response => {
        this.getOqcDataFiles({ reqNo: this.reqNo })
        this.getRequestInfo({ reqNo: this.reqNo });
        this.remark = null;
        this.isOpenUploadFileModal = false
        this.isLoading = false;
      }
    )

  }

}
