import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QaOqcService } from '../services/qa-oqc.service';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QaOqcDocumentService } from '../../qa-oqc-document/services/qa-oqc-document.service';

@Component({
  selector: 'app-qa-oqc-evaluate',
  templateUrl: './qa-oqc-evaluate.component.html',
  styleUrls: ['./qa-oqc-evaluate.component.scss'],
})
export class QaOqcEvaluateComponent implements OnInit {

  @ViewChild('valueIpt') valueIpt!: ElementRef;

  constructor(
    private qaOqcSvc: QaOqcService,
    private qaOqcDocumentSvc: QaOqcDocumentService,
    private activatedRoute: ActivatedRoute,
    private jwtHelperSvc: JwtHelperService
  ) {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
  }

  baseUrl = environment.baseUrl;
  jwt: any;

  headerTitle!: string;

  reqNo: any;
  qaCard: any;
  requestStatus: any;
  itemCheck: any
  employee: any;
  requestInfo: any;
  oqcMasterData: any;
  isOpenModalHandleRequest: boolean = false;
  isShowUploadFileModal: boolean = false;
  uploadFileApi: string = '';
  oqcDataFiles: any;

  documents: any;

  ngOnInit(): void {
    this.reqNo = this.activatedRoute.snapshot.queryParams['reqNo'];
    this.qaCard = this.activatedRoute.snapshot.queryParams['qaCard'];
    this.requestStatus =
      this.activatedRoute.snapshot.queryParams['requestStatus'];

    this.headerTitle = `Thông tin request: ${this.reqNo}`

    this.getRequestInfo({ reqNo: this.reqNo });
    // this.getOqcMasterData(this.reqNo, this.qaCard);
    this.getOqcDataFiles({ reqNo: this.reqNo })

    this.getDocuments({model: this.qaCard.split('*')[0]});
  }

  getOqcMasterData(reqNo: any, qaCard: any) {
    this.qaOqcSvc.getOqcMasterData(reqNo, qaCard).subscribe((response) => {
      this.oqcMasterData = response;
      console.log(this.oqcMasterData);
    });
  }

  getRequestInfo(searchParam: any) {
    this.qaOqcSvc.getOqcRequests(searchParam).subscribe((response) => {
      this.requestInfo = response[0];
      console.log(this.requestInfo);
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
    this.isShowUploadFileModal = true;
    this.uploadFileApi = `${this.baseUrl}/QA/OqcCheck/UploadFile?createdBy=${this.jwt.Username}&reqNo=${this.reqNo}`;
  }

  getOqcDataFiles(searchParam: any) {
    this.qaOqcSvc.getOqcDataFiles(searchParam).subscribe(
      response => {
        this.oqcDataFiles = response
      }
    )
  }

  closeUploadFileModal() {
    this.getOqcDataFiles({ reqNo: this.reqNo });
    this.getRequestInfo({ reqNo: this.reqNo });
    this.isShowUploadFileModal = false

  }

  fileClick(item: any) {

    let searchVo = {
      url: `${item.url}${item.fileName}`
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

}
