import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QaEquipmentMngService } from '../services/qa-equipment-mng.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-qa-equipment-label-create',
  templateUrl: './qa-equipment-label-create.component.html',
  styleUrls: ['./qa-equipment-label-create.component.scss']
})
export class QaEquipmentLabelCreateComponent implements OnInit {

  constructor(private qaEquipmentMngSvc: QaEquipmentMngService, private jwtHelperSvc: JwtHelperService) { }

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
    console.log('Data in tem',event);
    
    this.labels = event.file.response
  }

  printLabel() {

    let userId = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).UserId;

    this.qaEquipmentMngSvc.printLabel(this.labels, userId).subscribe(
      response => {
        console.log('Labels: ', response)
      }
    );

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
