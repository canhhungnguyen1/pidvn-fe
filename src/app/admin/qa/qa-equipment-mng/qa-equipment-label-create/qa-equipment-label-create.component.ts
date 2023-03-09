import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QaEquipmentMngService } from '../services/qa-equipment-mng.service';

@Component({
  selector: 'app-qa-equipment-label-create',
  templateUrl: './qa-equipment-label-create.component.html',
  styleUrls: ['./qa-equipment-label-create.component.scss']
})
export class QaEquipmentLabelCreateComponent implements OnInit {

  constructor(private qaEquipmentMngSvc: QaEquipmentMngService) { }

  ngOnInit(): void {
  }

  isOpenUploadDataLabel: boolean = false

  baseUrl = environment.baseUrl;

  labels: any;

  uploadFileApi: string = '';

  openUploadDataLabelModal() {
    this.isOpenUploadDataLabel = true;
    this.uploadFileApi = `${this.baseUrl}/Qa/EquipmentMng/CreateLabel`;
  }

  handleCancel() {
    this.isOpenUploadDataLabel = false
  }

  onUploadDataLabel(event: any) {
    console.log(event);
    
    this.labels = event.file.response
  }


  downloadTemplateCreateLabel() {
    this.qaEquipmentMngSvc.downloadTemplateCreateLabel().subscribe(response => {

      console.log(response);
      const blob = new Blob([response], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `Template_EquipmentLabelData.xlsx`;
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
