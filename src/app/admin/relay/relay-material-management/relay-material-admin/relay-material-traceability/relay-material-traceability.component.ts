import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ReMatAdmService } from '../services/re-mat-adm.service';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-relay-material-traceability',
  templateUrl: './relay-material-traceability.component.html',
  styleUrls: ['./relay-material-traceability.component.scss'],
})
export class RelayMaterialTraceabilityComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent

  lines: any;
  records: any;
  qaCards: any;

  searchVo: any = {};
  date: Date[] = [new Date(), new Date()];

  employee: any;

  recordSelected: any;

  constructor(private reMatAdmSvc: ReMatAdmService) {}

  ngOnInit(): void {
    this.searchVo.recordType = 'RDC';
    this.getLines(5);
    this.getQaCards();
  }

  getQaCards() {
    this.reMatAdmSvc.getQaCards().subscribe((response) => {
      this.qaCards = response;
    });
  }

  getLines(productId: number) {
    this.reMatAdmSvc.getLines(productId).subscribe((response) => {
      this.lines = response;
      console.log('Lines: ', this.lines);
    });
  }

  onSearch() {

    if (
      this.searchVo.recordType == 'RDC' ||
      this.searchVo.recordType == 'RNP'
    ) {
      this.employee = 'username';
    } else {
      this.employee = 'sender';
    }
    
    this.dataGrid.instance.beginCustomLoading("Loading...");
    this.reMatAdmSvc
      .materialTraceability(this.searchVo)
      .subscribe((response) => {
        this.records = response;
        console.log('DATAS: ', this.records);
        this.dataGrid.instance.endCustomLoading();
      });
  }

  onExport() {
    this.reMatAdmSvc.exportData(this.searchVo).subscribe((response) => {
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

  onExportClient(event: any) {

    const workbook = new Workbook();    
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
            component: event.component,
            worksheet: worksheet
        }).then(function() {
            workbook.xlsx.writeBuffer()
                .then(function(buffer: BlobPart) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `Data.xlsx`);
                });
        });
  }

  onChangeTime(event: Date[]) {
    this.searchVo.fromDate = event[0];
    this.searchVo.toDate = event[1];
  }

  editQty(data: any) {
    this.recordSelected = { ...data };
    console.log('EDIT: ', data);
    // if (data.recordType == 'CDL') {
    //   this.reMatAdmSvc.editQtyImportedToLine(this.recordSelected).subscribe(
    //     response => {
    //       this.onSearch();
    //     }
    //   );
    // }
  }
}
