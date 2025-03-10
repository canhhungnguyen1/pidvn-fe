import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HrEmpCourseService } from '../../services/hr-emp-course.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-hr-emp-course-history',
  templateUrl: './hr-emp-course-history.component.html',
  styleUrls: ['./hr-emp-course-history.component.scss']
})
export class HrEmpCourseHistoryComponent implements OnInit {

  constructor(
    private hrEmpCourseSvc: HrEmpCourseService,
    private jwtHelperService: JwtHelperService,
    private msg: NzMessageService,
    private toastr: ToastrService
  ) { }

  histories: any;
  isOpenModalUpload:boolean = false
  fileUploadApi: any;
  baseUrl = environment.baseUrl;

  ngOnInit(): void {
    this.getCourseHistories();
  }

  getCourseHistories() {
    let username = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.hrEmpCourseSvc.getCourseHistories({}).subscribe(
      response => {
        this.histories = response
      }
    )
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.isOpenModalUpload = false;
      this.toastr.success('Thành công','Success')
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }


  openFileUploadModal() {
    this.isOpenModalUpload = true;
    this.fileUploadApi = `${this.baseUrl}/HR/Course/UploadTrainingRecordData`;
  }


  onExportClient(event: any) {
      const workbook = new Workbook();    
          const worksheet = workbook.addWorksheet('Main sheet');
          exportDataGrid({
              component: event.component,
              worksheet: worksheet
          }).then(function() {
              workbook.xlsx.writeBuffer()
                  .then(function(buffer: BlobPart) {
                      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'History-Data.xlsx');
                  });
          });
    }

}
