import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.scss'],
})
export class UserFileComponent implements OnInit {

  constructor(
    private userInfoSvc: UserInfoService,
    private msg: NzMessageService,
    private jwtHelperSvc: JwtHelperService
  ) {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
  }

  baseUrl = environment.baseUrl;
  jwt: any;

  userFiles: any;
  userFileTypes: any;
  isOpenUploadFileModal: boolean = false;

  fallback = `${this.baseUrl}/images/pdf.png`;
  selectedFileType: string | undefined;
  uploadFileApi: string = '';

  ngOnInit(): void {
    this.getUserFileTypes();
    this.getUserFiles();
  }

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPngOrPdf =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf';
      if (!isJpgOrPngOrPdf) {
        this.msg.error('Chỉ có thể upload file ảnh hoặc pdf');
        observer.complete();
        return;
      }

      const isSelectFile = this.selectedFileType;
      if (!isSelectFile) {
        this.msg.error('Bạn cần chọn loại giấy tờ');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPngOrPdf || isSelectFile);
      observer.complete();
    });

  fileClick(event: any) {
    if (event.fileFormat !== 'application/pdf') {
      return;
    }
    console.log('Xử lý view file PDF', event);
    this.userInfoSvc.openUserFile(event).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      let fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  deleteFile(event: any) {
    console.log('Delete : ', event);
  }

  onChangeFileType(event: any) {
    this.uploadFileApi = `${this.baseUrl}/Personal/UploadFile?username=${this.jwt.Username}&fileType=${event}`;
  }

  closeUploadFileModal() {
    this.isOpenUploadFileModal = false;
    this.getUserFiles();
  }

  getUserFiles() {
    let username = this.jwt.Username;
    this.userInfoSvc.getUserFiles(username).subscribe((response) => {
      this.userFiles = response;
      console.log('UserFiles : ', response);
    });
  }

  getUserFileTypes() {
    this.userInfoSvc.getUserFileTypes().subscribe((response) => {
      this.userFileTypes = response;
    });
  }
}
