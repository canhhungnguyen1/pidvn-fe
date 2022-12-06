import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HrEmpMngService } from '../services/hr-emp-mng.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService,
    private msg: NzMessageService,
    private hrEmpMngSvc: HrEmpMngService
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
    let username = this.activatedRoute.snapshot.queryParams['username'];
    this.hrEmpMngSvc.getUserFiles(username).subscribe((response) => {
      this.userFiles = response;
      console.log('UserFiles : ', response);
    });
  }

  getUserFileTypes() {
    this.hrEmpMngSvc.getUserFileTypes().subscribe((response) => {
      this.userFileTypes = response;
    });
  }

  getUserInfo() {
    let username = this.activatedRoute.snapshot.queryParams['username'];
    this.hrEmpMngSvc.getUserInfo(username).subscribe((response) => {
      this.positions = response.positions;
      this.sections = response.sections;
      this.subsections = response.subsections;
      this.userBasicInfo = response.userBasicInfo;
      this.userOtherInfo = response.userOtherInfo;
    });
  }

  updateUserBasicInfo() {
    this.hrEmpMngSvc
      .updateUserBasicInfo(this.userBasicInfo)
      .subscribe((response) => {
        this.toastr.success('Cập nhật thành công', '200 OK');
      });
  }

  updateUserOtherInfo() {
    console.log('OtherInfo: ', this.userOtherInfo);
    this.userOtherInfo.username = this.jwt.Username;
    this.hrEmpMngSvc
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
    let username = this.activatedRoute.snapshot.queryParams['username'];
    this.uploadFileApi = `${this.baseUrl}/Personal/UploadFile?username=${username}&fileType=${event}`;
  }

  fileClick(event: any) {
    if (event.fileFormat !== 'application/pdf') {
      return;
    }
    console.log('Xử lý view file PDF', event);
    this.hrEmpMngSvc.openUserFile(event).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      let fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  deleteFile(event: any) {
    console.log('Delete : ', event);

    this.hrEmpMngSvc.deleteUserFile(event.id).subscribe(
      response => {
        this.toastr.success('Đã xóa','OK')
        this.getUserFiles();
      }
    )


  }



}
