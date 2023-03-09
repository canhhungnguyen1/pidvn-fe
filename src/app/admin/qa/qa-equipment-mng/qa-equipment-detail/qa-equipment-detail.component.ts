import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { QaEquipmentMngService } from '../services/qa-equipment-mng.service';

@Component({
  selector: 'app-qa-equipment-detail',
  templateUrl: './qa-equipment-detail.component.html',
  styleUrls: ['./qa-equipment-detail.component.scss'],
})
export class QaEquipmentDetailComponent implements OnInit {
  constructor(
    private qaEquipmentMngSvc: QaEquipmentMngService,
    private activatedRoute: ActivatedRoute,
    private jwtHelperSvc: JwtHelperService
  ) {}

  baseUrl = environment.baseUrl;

  ngOnInit(): void {
    this.user = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let deviceId = this.activatedRoute.snapshot.paramMap.get('deviceId');
    this.getDeviceById(deviceId);
    this.getDocTypeDevices();
    this.getQaDocDevices(deviceId);
  }

  device: any;

  user!: string;

  isOpenUploadModal: boolean = false;

  docs = [];

  fileUploadApi: any;

  fileTypeSelected: any;

  fileTypes: any;

  /**
   * Lấy thông tin thiết bị theo ID
   * @param deviceId 
   */
  getDeviceById(deviceId: any) {
    this.qaEquipmentMngSvc.getQaDeviceById(deviceId).subscribe((response) => {
      this.device = response;
    });
  }

  /**
   * Lấy danh sách các tài liệu theo thiết bị
   * @param deviceId 
   */
  getQaDocDevices(deviceId: any) {
    this.qaEquipmentMngSvc.getQaDocDevices(deviceId).subscribe(
      response => {
        this.docs = response.reverse();
        console.log('getQaDocDevices: ', response);
        
      }
    )
  }

  /**
   * Lấy các loại tài liệu
   */
  getDocTypeDevices() {
    this.qaEquipmentMngSvc.getDocTypeDevices().subscribe((response) => {
      this.fileTypes = response;
    });
  }

  nzChangeUpload(event: any) {}

  openUploadModal() {
    this.isOpenUploadModal = true;
  }

  closeUploadModal() {
    this.isOpenUploadModal = false;

    this.fileUploadApi = '';
    this.fileTypeSelected = null;
    this.getQaDocDevices(this.device.id);
  }

  onChangeFileType(event: any) {
    this.fileUploadApi = `${this.baseUrl}/Qa/EquipmentMng/Upload?deviceNo=${this.device?.deviceNo}&deviceId=${this.device?.id}&fileType=${this.fileTypeSelected}&createdBy=${this.user}`;
  }

  downloadDocument(event: any) {
    let obj = {
      ...event.data,
      deviceNo: this.device.deviceNo
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

  previewFile(event: any) {

    let obj = {
      ...event.data,
      deviceNo: this.device.deviceNo
    }

    this.qaEquipmentMngSvc
      .previewFile(obj)
      .subscribe((responseMessage) => {
        let file = new Blob([responseMessage], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }
}
