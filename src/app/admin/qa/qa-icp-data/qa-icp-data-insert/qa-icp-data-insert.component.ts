import { Component, OnInit, ViewChild } from '@angular/core';
import { IcpDto } from '../models/IcpDto';
import { QaIcpDataService } from '../services/qa-icp-data.service';
import { ModelDto } from '../models/ModelDto';
import { DomSanitizer } from '@angular/platform-browser';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';
import { PsMasterDto } from '../models/PsMasterDto';
import { ToastrService } from 'ngx-toastr';
import {
  DxFileUploaderComponent,
  DxValidationGroupComponent,
  DxValidatorComponent,
} from 'devextreme-angular';

@Component({
  selector: 'app-qa-icp-data-insert',
  templateUrl: './qa-icp-data-insert.component.html',
  styleUrl: './qa-icp-data-insert.component.scss',
})
export class QaIcpDataInsertComponent implements OnInit {
  @ViewChild('validatorGroup', { static: false })
  validatorGroup!: DxValidationGroupComponent;

  @ViewChild('fileUploader', { static: false })
  fileUploader!: DxFileUploaderComponent;

  constructor(
    private qaIcpDataSvc: QaIcpDataService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getModels();
  }

  icpData: IcpDto[] = new Array();

  models: ModelDto[] = new Array();

  psMasters: PsMasterDto[] = new Array();

  pdfSrc: any;

  icpDto: IcpDto = new IcpDto();

  isOpenIcpModal: boolean = false;

  isOpenUploadTestReportModal: boolean = false;

  parentModelSelected!: string;

  isLoading: boolean = false;

  getModels() {
    this.qaIcpDataSvc.getModels().subscribe((response) => {
      this.models = response.result;
    });
  }

  onChangeParentModel(event: any) {
    let parentModel = event;
    this.qaIcpDataSvc.getIcpData(parentModel).subscribe((response) => {
      this.icpData = response.result;
    });

    this.qaIcpDataSvc.getPsMasters(parentModel).subscribe((response) => {
      this.psMasters = response.result;
    });
  }

  previewFile(event: any) {
    this.isLoading = true;

    this.icpDto.testNo = event.data.testNo;

    let params = {
      testNo: event.data.testNo,
    };

    this.qaIcpDataSvc.previewFile(params).subscribe(
      (response) => {
        let file = new Blob([response], { type: 'application/pdf' });
        let fileURL = window.URL.createObjectURL(file);
        let fileName = `${params.testNo}.pdf`;

        // Open the file in a new window

        // window.open(fileURL);
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);

        this.isLoading = false;

        return;
      },
      (error) => {
        console.log('error: ', error);

        this.toastr.error(error.result, 'Error');
        this.isLoading = false;
      }
    );
  }


  downloadFile() {
    console.log(this.icpDto);
    
    this.qaIcpDataSvc.downloadFile(this.icpDto).subscribe(
      response => {
        console.log(response);
      const blob = new Blob([response], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `${this.icpDto.testNo}.pdf`;
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
      }
    )
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
          'ICP-Data.xlsx'
        );
      });
    });
  }

  openIcpModal(type: string, data: any) {
    if (type === 'insert') {
      this.icpDto = new IcpDto();
      this.icpDto.parentModel = this.parentModelSelected;
    } else if (type === 'update') {
      this.icpDto = data;
    }

    console.log(type, this.icpDto);

    this.isOpenIcpModal = true;
  }

  onSaveIcpData() {
    if (this.icpDto.id === undefined) {
      if (!this.validatorGroup.instance.validate().isValid) {
        return;
      }
      this.isLoading = true;
      this.qaIcpDataSvc.insertIcpData(this.icpDto).subscribe((response) => {
        this.qaIcpDataSvc
          .getIcpData(this.parentModelSelected)
          .subscribe((response) => {
            this.icpData = response.result;
          });
        this.isLoading = false;
        this.isOpenIcpModal = false;
        return;
      });
    } else if (this.icpDto.id) {
      this.isLoading = true;
      this.qaIcpDataSvc.updateIcpData(this.icpDto).subscribe((response) => {
        this.qaIcpDataSvc
          .getIcpData(this.parentModelSelected)
          .subscribe((response) => {
            this.icpData = response.result;
          });
        this.isLoading = false;
        this.isOpenIcpModal = false;
        return;
      });
    }
  }

  opentUploadTestReports() {
    this.isOpenUploadTestReportModal = true;
  }

  uploadTestReports() {
    const selectedFiles = this.fileUploader.value;

    if (selectedFiles.length === 0) {
      this.toastr.warning('Cần chọn file upload', 'Warning');
      return;
    }

    this.isLoading = true;

    this.qaIcpDataSvc.uploadTestReports(selectedFiles).subscribe(
      (response) => {
        this.isOpenUploadTestReportModal = false;
        this.isLoading = false;
        this.toastr.success('Upload thành công', 'Thông báo');
      },
      (error) => {
        this.isOpenUploadTestReportModal = false;
        this.isLoading = false;
      }
    );
  }

  deleteIcpData(event: any) {
    this.qaIcpDataSvc.deleteIcpData(event.id).subscribe((response) => {
      this.toastr.success('Xóa thành công', 'Thông báo');
      this.qaIcpDataSvc
        .getIcpData(this.parentModelSelected)
        .subscribe((response) => {
          this.icpData = response.result;
        });
    });
  }
}
