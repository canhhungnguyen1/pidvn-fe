import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QaOqcDocumentService } from '../services/qa-oqc-document.service';

@Component({
  selector: 'app-qa-oqc-document-detail',
  templateUrl: './qa-oqc-document-detail.component.html',
  styleUrls: ['./qa-oqc-document-detail.component.scss'],
})
export class QaOqcDocumentDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private qaOqcDocumentSvc: QaOqcDocumentService,
    private jwtHelperSvc: JwtHelperService,
    private msg: NzMessageService,
    private toastr: ToastrService
  ) {}

  baseUrl = environment.baseUrl;

  fileUploadApi: string = '';

  model: any;

  isOpenUploadModal: boolean = false;

  fileTypeSelected: any = null;

  fileTypes: any;

  user!: string;

  documents: any;

  ngOnInit(): void {
    this.user = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.model = this.activatedRoute.snapshot.queryParams['model'];

    this.getDocuments({ model: this.model });
    this.getOqcDocumentTypes();
  }

  getDocuments(filter: any) {
    this.qaOqcDocumentSvc.getDocuments(filter).subscribe((response) => {
      this.documents = response;
    });
  }

  deleteDocument(item: any) {
    this.qaOqcDocumentSvc.deleteDocument(item.data.id).subscribe((response) => {
      this.getDocuments({ model: this.model });
      this.toastr.success('Đã xóa file','Success')
    });
  }

  getOqcDocumentTypes() {
    this.qaOqcDocumentSvc.getOqcDocumentTypes().subscribe((response) => {
      this.fileTypes = response;
    });
  }

  openUploadModal() {
    this.isOpenUploadModal = true;
  }

  onChangeFileType(event: any) {
    this.fileUploadApi = `${this.baseUrl}/QA/OqcDocument/Upload?model=${this.model}&fileType=${this.fileTypeSelected}&createdBy=${this.user}`;
  }

  closeUploadModal() {
    this.isOpenUploadModal = false;
    this.fileUploadApi = '';
    this.fileTypeSelected = null;
    this.getDocuments({ model: this.model });
  }

  nzChangeUpload(event: any) {
    // console.log(event);

    let fileList = [...event.fileList];

    if (fileList.length > 1) {
    }
  }

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      console.log('File: ', file);

      const isValidType =
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/pdf';

      if (!isValidType) {
        this.msg.error('Định dạng file không hợp lệ');
        observer.complete();
        return;
      }

      observer.next(isValidType);
      observer.complete();
    });

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
}
