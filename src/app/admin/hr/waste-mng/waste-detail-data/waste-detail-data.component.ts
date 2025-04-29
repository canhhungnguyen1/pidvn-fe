import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WasteMngService } from '../services/waste-mng.service';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'app-waste-detail-data',
  templateUrl: './waste-detail-data.component.html',
  styleUrls: ['./waste-detail-data.component.scss'],
})
export class WasteDetailDataComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private wasteMngSvc: WasteMngService,
    private toastr: ToastrService,
    private msg: NzMessageService,
    private jwtHelperService: JwtHelperService
  ) {}

  baseUrl = environment.baseUrl;
  uploadImageApi: any;

  wasteMaster: any;
  wasteDetails: any;
  wasteTypes: any;
  wasteTypeSelected: any;
  users: any;
  // userSelected: any;
  weight: any;
  remark: any;
  netWeight: any;
  sealNo: any;
  packagingNo: any;
  packagingAmount: number = 1;

  wasteImages: NzUploadFile[] = [];
  descriptionImage: any;
  fallback =
    'data:image/png;base64,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';

  isOpenInsertModal: boolean = false;
  isShowSummary: boolean = false;

  ngOnInit(): void {
    this.getMasterData();
    this.getWasteDetailData();
  }

  getMasterData() {
    let searchVo = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
    };
    this.wasteMngSvc.getWasteMasterData(searchVo).subscribe((response) => {
      this.wasteMaster = response[0];
      this.getWasteType(response[0].wasteGroup);
    });
  }

  getWasteDetailData() {
    let searchVo = {
      wasteMaster: this.activatedRoute.snapshot.paramMap.get('id'),
    };
    this.wasteMngSvc.getWasteDetailData(searchVo).subscribe((response) => {
      this.wasteDetails = response;
    });
  }

  getWasteType(wasteGroup: number) {
    this.wasteMngSvc.getWasteType(wasteGroup).subscribe((response) => {
      this.wasteTypes = response;
    });
  }

  changeWasteType(event: any) {
    console.log('changeWasteType: ', event);
    for (const item of this.wasteTypes) {
      if (item.id == event) {
        this.descriptionImage = item.image;
        break;
      }
    }
  }

  openInsertModal() {
    this.isOpenInsertModal = true;
    this.wasteImages = [];
    this.wasteTypeSelected = null;
    this.remark = null;
    this.weight = null;
    this.netWeight = null;
    this.sealNo = null;
    this.packagingNo = null;
    this.packagingAmount = 1;
    this.uploadImageApi = `${this.baseUrl}/HR/WasteMng/UploadImage`;
  }

  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    console.log('AAA: PREVIEW');
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  beforeUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('Bạn chỉ có thể upload ảnh');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng);
      observer.complete();
    });

  handleRemove = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      this.wasteMngSvc.removeImage(file.response.id).subscribe((response) => {
        console.log('Response Remove: ', response);
        observer.next(true);
        observer.complete();
      });
    });

  cancelInsert() {
    this.isOpenInsertModal = false;
  }

  insertData() {
    console.log('wasteTypeSelected : ', this.wasteTypeSelected);

    if (this.wasteMaster.wasteGroup == 3) {
      if (!this.wasteTypeSelected || !this.weight || !this.sealNo) {
        this.toastr.warning('Cần nhập đủ thông tin', 'Warning');
        return;
      }
    } else {
      if (!this.wasteTypeSelected || !this.weight) {
        this.toastr.warning('Cần nhập đủ thông tin', 'Warning');
        return;
      }
    }

    let images = new Array();
    this.wasteImages.forEach((item) => {
      images.push(item.response.id);
    });

    let createdBy = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let data = {
      wasteMaster: this.wasteMaster.id,
      wasteGroup: this.wasteMaster.wasteGroup,
      wasteType: this.wasteTypeSelected,
      createdBy: createdBy,
      weight: this.weight,
      netWeight: this.weight - this.packagingAmount * 2,
      sealNo: this.sealNo,
      packagingNo: this.packagingNo,
      remark: this.remark,
      images: images,
    };

    this.wasteMngSvc.createWasteDetailData(data).subscribe((response) => {
      this.getWasteDetailData();
      this.isOpenInsertModal = false;
    });
  }

  onClickSummary() {
    let searchVo = {
      wasteMaster: this.activatedRoute.snapshot.paramMap.get('id'),
    };
    this.wasteMngSvc
      .getWasteDetailDataSummary(searchVo)
      .subscribe((response) => {
        this.wasteDetails = response;
        this.isShowSummary = true;
        console.log('Summary: ', this.wasteDetails);
      });
  }

  setupUnitPrice() {
    let wasteMaster = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('MASTER_ID: ', wasteMaster);
    this.wasteMngSvc.setupUnitPrice(wasteMaster).subscribe((response) => {
      console.log('UnitPrice: ', response);
      this.getWasteDetailData();
      this.toastr.success('Thành công', 'Success');
    });
  }

  onClickDataList() {
    this.isShowSummary = false;
    this.getWasteDetailData();
  }

  exportMasterData() {
    let masterId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.wasteMngSvc.exportMasterData(masterId).subscribe((response) => {
      const blob = new Blob([response], {
        type: 'application/pdf',
      });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `Biên bản bàn giao CTRTT tái chế.pdf`;
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

  exportChungTu() {
    console.log('Xuat chung tu: ', this.wasteMaster.wasteGroup);
    let masterId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.wasteMaster.wasteGroup != 4) {
      return;
    }

    this.wasteMngSvc.exportChungTu(masterId).subscribe((response) => {
      const blob = new Blob([response], {
        type: 'application/pdf',
      });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `Chứng từ CTNH.pdf`;
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

  removeWasteDetailData(event: any) {
    this.wasteMngSvc.removeWasteDetailData(event.id).subscribe((response) => {
      this.toastr.success('Đã xóa');
      this.getWasteDetailData();
    });
  }

  onExcelDownload() {
    let searchVo = {
      wasteMaster: this.activatedRoute.snapshot.paramMap.get('id'),
    };

    this.wasteMngSvc.onExcelDownload(searchVo).subscribe((response) => {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `Data.xlsx`;
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

  pdfUrl: any;
  viewReport() {
    let masterId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.wasteMngSvc.getPdfReport(masterId).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      let fileURL = URL.createObjectURL(file);
      let fileName = `aaa.pdf`;

      // Create a link element to download the file with the file name
      let a = document.createElement('a');
      a.href = fileURL;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // Open the file in a new window
      window.open(fileURL);

      // Remove the link element after the download
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL);
      }, 100);
    });
  }

  onExportClient(event: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');
    exportDataGrid({
      component: event.component,
      worksheet: worksheet,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'Data.xlsx'
        );
      });
    });
  }
}
