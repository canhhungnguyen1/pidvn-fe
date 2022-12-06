import { Component, OnInit } from '@angular/core';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HrEmpFileService } from '../services/hr-emp-file.service';

@Component({
  selector: 'app-hr-emp-file',
  templateUrl: './hr-emp-file.component.html',
  styleUrls: ['./hr-emp-file.component.scss'],
})
export class HrEmpFileComponent implements OnInit {
  constructor(
    private hrEmpFileSvc: HrEmpFileService,
    private ngxPhotoEditorSvc: NgxPhotoEditorService,
    private toastr: ToastrService
  ) {}

  output?: any;

  baseUrl = environment.baseUrl;
  users: any;
  isOpenFileModal: boolean = false;
  userSelected: any;
  userFiles: any;

  fallback = `${this.baseUrl}/images/pdf.png`;

  ngOnInit(): void {
    this.getUsers();
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
}
