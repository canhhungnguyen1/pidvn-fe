import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qa-training-matrix-record',
  templateUrl: './qa-training-matrix-record.component.html',
  styleUrls: ['./qa-training-matrix-record.component.scss'],
})
export class QaTrainingMatrixRecordComponent implements OnInit {

  constructor(private router: Router, private msg: NzMessageService) {}

  ngOnInit(): void {}

  
  date = new Date()
  trainingRecords: any;
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
}
