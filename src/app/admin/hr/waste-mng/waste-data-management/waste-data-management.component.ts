import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToastrService } from 'ngx-toastr';
import { WasteMngService } from '../services/waste-mng.service';
import { Workbook } from 'exceljs';
import { exportDataGrid, exportPivotGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';
import { DxPivotGridTypes } from 'devextreme-angular/ui/pivot-grid';

@Component({
  selector: 'app-waste-data-management',
  templateUrl: './waste-data-management.component.html',
  styleUrls: ['./waste-data-management.component.scss'],
})
export class WasteDataManagementComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private wasteMngSvc: WasteMngService,
    private toastr: ToastrService,
    private msg: NzMessageService
  ) {}

  date: Date[] = [new Date(), new Date()];
  wasteGroups!: Array<any>;
  wasteSearchVo: any = {};

  wasteDetailData: any;
  dataSource: any;

  ngOnInit(): void {
    this.getWasteGroup();
  }

  onSearch() {
    console.log('this.wasteSearchVo: ', this.wasteSearchVo);
    
    this.getWasteData();
  }

  onChangeTime(event: Date[]) {
    this.wasteSearchVo.fromDate = event[0];
    this.wasteSearchVo.toDate = event[1];
  }

  getWasteGroup() {
    this.wasteMngSvc.getWasteGroup().subscribe((response) => {
      this.wasteGroups = response;
    });
  }

  getWasteData() {
    this.wasteMngSvc
      .getWasteDetailDataSummaryAll(this.wasteSearchVo)
      .subscribe((response) => {
        this.wasteDetailData = response;
        console.log(response);

        this.dataSource = {
          fields: [
            {
              caption: 'Nhóm chất thải',
              dataField: 'wasteGroupName',
              area: 'row',
              expanded: true,
            },
            {
              caption: 'Loại chất thải',
              dataField: 'wasteTypeName',
              area: 'row',
              width: 150,
            },
            {
              dataField: 'createdAt',
              dataType: 'date',
              area: 'column',
              expanded: true,
            },
            {
              caption: 'Khối lượng (Kg)',
              dataField: 'weight',
              dataType: 'number',
              area: 'data',
              summaryType: 'sum',
              format: {
                type: 'fixedPoint',
                precision: 2,
              },
            },
            {
              caption: 'Amount (VNĐ)',
              dataField: 'amount',
              dataType: 'number',
              area: 'data',
              summaryType: 'sum',
              format: { style: 'currency', currency: 'VND', useGrouping: true },
            },
          ],
          store: this.wasteDetailData,
        };
      });
  }

  onExporting(e: DxPivotGridTypes.ExportingEvent) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Data');

    exportPivotGrid({
      component: e.component,
      worksheet,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'Summary.xlsx'
        );
      });
    });
  }
}
