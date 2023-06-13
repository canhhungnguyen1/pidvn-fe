import { Component, OnInit } from '@angular/core';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HrEmpFileService } from '../services/hr-emp-file.service';
import { UserInfoService } from '../../../personal/services/user-info.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-hr-emp-file',
  templateUrl: './hr-emp-file.component.html',
  styleUrls: ['./hr-emp-file.component.scss'],
})
export class HrEmpFileComponent implements OnInit {
  constructor(
    private hrEmpFileSvc: HrEmpFileService,
    private userInfoSvc: UserInfoService,
    private ngxPhotoEditorSvc: NgxPhotoEditorService,
    private toastr: ToastrService,
    private msg: NzMessageService,
  ) {}

  output?: any;

  baseUrl = environment.baseUrl;
  users: any;
  isOpenFileModal: boolean = false;
  userSelected: any;
  userFiles: any;

  fallback = `${this.baseUrl}/images/pdf.png`;


  isOpenUploadFileModal: boolean = false;
  selectedFileType: string | undefined;
  uploadFileApi: string = '';
  userFileTypes: any;

  ngOnInit(): void {
    this.getUsers();
    this.getUserFileTypes();
  }

  getUsers() {
    this.hrEmpFileSvc.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  onRowClick(event: any) {
    this.userSelected = event.data;
    console.log(this.userSelected);
    this.isOpenFileModal = true;
    this.hrEmpFileSvc
      .getUserFiles(this.userSelected.username)
      .subscribe((response) => {
        this.userFiles = this.buildData(response);
      });
  }

  buildData(files: any) {
    let map = new Map();
    for (const item of files) {
      map.set(item.fileType, {
        fileType: item.fileType,
        fileTypeName: item.fileTypeName,
      });
    }

    let fileTypes = [...map.values()];

    let result = new Array();

    for (const fileType of fileTypes) {
      let listFile = new Array();

      for (const file of files) {
        if (fileType.fileType == file.fileType) {
          listFile.push(file);
        }
      }

      let obj = {
        fileType: fileType.fileTypeName,
        files: listFile,
      };

      result.push(obj);
    }

    return result;
  }

  deleteFile(event: any) {
    console.log(event);

    this.hrEmpFileSvc.deleteFile(event).subscribe((response) => {
      this.toastr.success('Xóa thành công', 'Success');
      this.hrEmpFileSvc
        .getUserFiles(this.userSelected.username)
        .subscribe((response) => {
          this.userFiles = this.buildData(response);
        });
    });
  }



  onChangeFileType(event: any) {
    this.uploadFileApi = `${this.baseUrl}/Personal/UploadFile?username=${this.userSelected.username}&fileType=${event}`;
  }

  closeUploadFileModal() {
    this.isOpenUploadFileModal = false;
    this.hrEmpFileSvc
      .getUserFiles(this.userSelected.username)
      .subscribe((response) => {
        this.userFiles = this.buildData(response);
      });
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


  getUserFileTypes() {
    this.userInfoSvc.getUserFileTypes().subscribe((response) => {
      this.userFileTypes = response;
    });
  }

  
}
