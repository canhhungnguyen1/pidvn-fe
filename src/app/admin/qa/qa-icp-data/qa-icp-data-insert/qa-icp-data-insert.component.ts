import { Component, OnInit } from '@angular/core';
import { IcpDto } from '../models/IcpDto';
import { QaIcpDataService } from '../services/qa-icp-data.service';
import { ModelDto } from '../models/ModelDto';
import { DomSanitizer } from '@angular/platform-browser';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-qa-icp-data-insert',
  templateUrl: './qa-icp-data-insert.component.html',
  styleUrl: './qa-icp-data-insert.component.scss',
})
export class QaIcpDataInsertComponent implements OnInit {
  constructor(
    private qaIcpDataSvc: QaIcpDataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getModels();
  }

  icpData: IcpDto[] = [];

  models: ModelDto[] = new Array();

  pdfSrc: any;

  icpDto: IcpDto = new IcpDto();

  getModels() {
    this.qaIcpDataSvc.getModels().subscribe((response) => {
      this.models = response.result;
    });
  }

  getIcpData() {}

  onChangeParentModel(event: any) {
    let parentModel = event;
    this.qaIcpDataSvc.getIcpData(parentModel).subscribe((response) => {
      this.icpData = response.result;
    });
  }

  previewFile(event: any) {

    this.icpDto.testNo = event.data.testNo

    let params = {
      testNo: event.data.testNo,
    };

    this.qaIcpDataSvc.previewFile(params).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      let fileURL = window.URL.createObjectURL(file);
      let fileName = `${params.testNo}.pdf`;

      // Open the file in a new window

      // window.open(fileURL);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);

      return;
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
          'ICP-Data.xlsx'
        );
      });
    });
  }
}
