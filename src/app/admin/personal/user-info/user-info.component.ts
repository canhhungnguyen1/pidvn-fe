import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(
    private userInfoSvc: UserInfoService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService,
    private msg: NzMessageService
  ) {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
  }

  baseUrl = environment.baseUrl;
  jwt: any;

  userFileTypes: any;
  userFiles: any;
  userBasicInfo: any = {};
  userOtherInfo: any = {};
  positions: any[] = [];
  sections: any[] = [];
  subsections: any[] = [];

  isOpenUploadFileModal: boolean = false;

  fallback = `${this.baseUrl}/images/pdf.png`;

  ngOnInit(): void {
    this.getUserFileTypes();
    this.getUserFiles();
    this.getUserInfo();
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

  getUserInfo() {
    let username = this.jwt.Username;
    this.userInfoSvc.getUserInfo(username).subscribe((response) => {
      this.positions = response.positions;
      this.sections = response.sections;
      this.subsections = response.subsections;
      this.userBasicInfo = response.userBasicInfo;
      this.userOtherInfo = response.userOtherInfo;
    });
  }

  updateUserBasicInfo() {
    this.userInfoSvc
      .updateUserBasicInfo(this.userBasicInfo)
      .subscribe((response) => {
        this.toastr.success('Cập nhật thành công', '200 OK');
      });
  }

  updateUserOtherInfo() {
    console.log('OtherInfo: ', this.userOtherInfo);
    this.userOtherInfo.username = this.jwt.Username;
    this.userInfoSvc
      .updateUserOtherInfo(this.userOtherInfo)
      .subscribe((response) => {
        this.toastr.success('Cập nhật thành công', '200 OK');
      });
  }

  closeUploadFileModal() {
    this.isOpenUploadFileModal = false;
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

  selectedFileType: string | undefined;
  uploadFileApi: string = '';

  onChangeFileType(event: any) {
    this.uploadFileApi = `${this.baseUrl}/Personal/UploadFile?username=${this.jwt.Username}&fileType=${event}`;
  }

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
}
