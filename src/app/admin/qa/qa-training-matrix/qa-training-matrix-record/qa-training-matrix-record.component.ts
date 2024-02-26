import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment';
import { QaTrainingMatrixService } from '../services/qa-training-matrix.service';

@Component({
  selector: 'app-qa-training-matrix-record',
  templateUrl: './qa-training-matrix-record.component.html',
  styleUrls: ['./qa-training-matrix-record.component.scss'],
})
export class QaTrainingMatrixRecordComponent implements OnInit {
  event: any;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private qaTrainingMatrixSvc: QaTrainingMatrixService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  searchParam = {
    trainingDate: new Date(),
    courseId: null,
  };

  trainingRecords: any;
  courses: any;
  insertType: string = 'Excel';
  baseUrl = environment.baseUrl;
  uploadFileApi: string = `${this.baseUrl}/Qa/TrainingMatrix/InsertByExcel`;

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  getCourses() {
    this.qaTrainingMatrixSvc.getCourses().subscribe((response) => {
      this.courses = response;
    });
  }

  onChangeCourse(event: any) {
    console.log('onChangeCourse: ', this.searchParam);

    this.qaTrainingMatrixSvc
      .getTrainingRecords(this.searchParam)
      .subscribe((response) => {
        this.trainingRecords = response;
      });
  }

  downloadTemplateUpload() {
    this.qaTrainingMatrixSvc.downloadTemplateUpload().subscribe((response) => {
      const blob = new Blob([response], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `Template.xlsx`;
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
}
