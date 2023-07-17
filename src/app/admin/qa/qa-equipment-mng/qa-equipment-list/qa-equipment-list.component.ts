import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QaEquipmentMngService } from '../services/qa-equipment-mng.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qa-equipment-list',
  templateUrl: './qa-equipment-list.component.html',
  styleUrls: ['./qa-equipment-list.component.scss']
})
export class QaEquipmentListComponent implements OnInit {

  @ViewChild('qrIpt') qrIpt!: ElementRef;

  constructor(private qaEquipmentMngSvc: QaEquipmentMngService,private router: Router, private jwtHelperSvc: JwtHelperService) { }

  ngOnInit(): void {
    this.user = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.getDocTypeDevices();

    

    //this.getQaDevices()
  }

  baseUrl = environment.baseUrl;
  user!: string;

  devices: any;
  deviceInfo: any;
  docs = [];

  fileUploadApi: any;

  fileTypeSelected: any = 1;

  fileTypes: any 

  isOpenUploadModal: boolean = false;

  deviceSearch: any;

  scanLabel(event: any) {
    this.qaEquipmentMngSvc.getDeviceInfo(event.target.value).subscribe(
      response => {
        this.deviceInfo = response;
        this.qrIpt.nativeElement.select();
        this.fileUploadApi = `${this.baseUrl}/Qa/EquipmentMng/Upload?controlNo=${this.deviceInfo?.info.controlNo}&deviceId=${this.deviceInfo?.info.id}&fileType=${this.fileTypeSelected}&createdBy=${this.user}`;
      }
    )
  }

  onSearch() {
    let event = {
      target: {
        value: this.deviceSearch
      }
    }
    this.scanLabel(event);
  }

  openUploadModal() {
    this.isOpenUploadModal = true;
  }

  previewFile(event: any) {

    let obj = {
      ...event.data,
      deviceNo: this.deviceInfo.controlNo
    }

    this.qaEquipmentMngSvc
      .previewFile(obj)
      .subscribe((responseMessage) => {
        let file = new Blob([responseMessage], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  downloadDocument(event: any) {
    let obj = {
      ...event.data,
      deviceNo: this.deviceInfo.controlNo
    }
    
    this.qaEquipmentMngSvc.downloadDocument(obj).subscribe(response => {

      console.log(response);
      const blob = new Blob([response], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `${obj.fileName}`;
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

  onChangeFileType(event: any) {
    this.fileUploadApi = `${this.baseUrl}/Qa/EquipmentMng/Upload?controlNo=${this.deviceInfo?.info.controlNo}&deviceId=${this.deviceInfo?.info.id}&fileType=${this.fileTypeSelected}&createdBy=${this.user}`;
    console.log('this.fileUploadApi: ', this.fileUploadApi);
    
  }

  closeUploadModal() {
    this.isOpenUploadModal = false;

    this.fileUploadApi = '';
    //this.fileTypeSelected = null;
    // this.getQaDocDevices(this.device.id);


    let event = {
      target: {
        value: this.deviceInfo?.info.controlNo
      }
    }
    this.scanLabel(event);
  }

  /**
   * Lấy các loại tài liệu
   */
  getDocTypeDevices() {
    this.qaEquipmentMngSvc.getDocTypeDevices().subscribe((response) => {
      this.fileTypes = response;
    });
  }

  deleteFile(item: any) {
    console.log('deleteFile: ', item.data)

    this.qaEquipmentMngSvc.deleteQaDocDevice(item.data.id).subscribe(
      response => {
        let event = {
          target: {
            value: this.deviceInfo?.info.controlNo
          }
        }
        this.scanLabel(event);
      }
    )



  }

  onRowPrepared(event: any) {

    console.log('onRowPrepared: ', event)


    if (event.rowType === 'data') {
      if (event.data.isDelete === 1) {
        event.rowElement.style.backgroundColor = '#ccc';
        event.rowElement.style.color = '#939393';
        // or
        event.rowElement.classList.add('my-class');
        // to override alternation color
        event.rowElement.className = event.rowElement.className.replace(
          'dx-row-alt',
          ''
        );
      }
    }
  }
  

  
}
