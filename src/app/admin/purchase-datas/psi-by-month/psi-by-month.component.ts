import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PurchaseDataService } from '../services/purchase-datas.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
// import { Workbook } from 'exceljs';
// import { saveAs } from 'file-saver';
import { exportPivotGrid } from 'devextreme/excel_exporter';
@Component({
  selector: 'app-psi-by-month',
  templateUrl: './psi-by-month.component.html',
  styleUrls: ['./psi-by-month.component.scss'],
})
export class PsiByMonthComponent implements OnInit, AfterViewInit {
  constructor(
    protected service: PurchaseDataService,
    private toastr: ToastrService
  ) {
    //this.genPivotTable([]);
  }

  pivotGridDataSource: any;

  lines: any;

  records: any = {};

  factories: string[] = [];

  searchVo = {
    // fromDate: new Date(),
    // toDate: new Date(),
    date: [new Date(), new Date()],
    factory: 'RE',
  };

  //date: Date[] = [];

  ngOnInit(): void {
    var curD = new Date();
    var fromDate = new Date(curD.getFullYear(), curD.getMonth(), 1);
    var toDate = new Date(curD.getFullYear(), 12, 0);
    this.searchVo.date = [fromDate, toDate];
    //console.log(this.searchVo);
    this.getFactories();
    this.getPsiByMonth();
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   const dataSource = this.pivotGrid.instance.getDataSource();
    //   dataSource.expandHeaderItem('row', ['North America']);
    //   dataSource.expandHeaderItem('column', [2013]);
    // }, 0);
  }

  searchData() {
    this.getPsiByMonth();
  }

  getFactories() {
    this.factories = ['RE', 'EM'];
    // this.service.getFactories().subscribe(
    //   response => {
    //     console.log('Balance: ', response)
    //     this.factories = response;
    //   }
    //   )
  }

  getPsiByMonth() {
    this.service
      .getPsiByMonth(this.searchVo.factory, this.searchVo.date)
      .subscribe((response) => {
        //console.log('RES: ', response)
        this.records = response.results;
        this.genPivotTable(response.results);
        //this.searchVo = response.params;
      });
  }

  onChangeTime(event: Date[]) {
    this.searchVo.date = event;
    console.log(this.searchVo.date);
    // this.searchVo.fromDate = event[0];
    // this.searchVo.toDate = event[1];
  }

  genPivotTable(records: any) {
    //this.customizeTooltip = this.customizeTooltip.bind(this);

    this.pivotGridDataSource = new PivotGridDataSource({
      fields: [
        {
          caption: 'Part No.',
          width: 120,
          dataField: 'pn',
          area: 'row',
          sortBySummaryField: 'Total',
        },
        {
          dataField: 'plan_date',
          // dataType: 'date',
          area: 'column',
        },
        {
          caption: 'Total',
          dataField: 'consumption',
          dataType: 'number',
          summaryType: 'sum',
          format: {
            type: 'fixedPoint',
            precision: 0,
          },
          area: 'data',
          // }, {
          //   caption: 'Running Total',
          //   dataField: 'qty',
          //   dataType: 'number',
          //   summaryType: 'sum',
          //   format: {
          //       type: "fixedPoint",
          //       precision: 0
          //   },
          //   area: 'data',
          //   runningTotal: 'row',
          //   allowCrossGroupCalculation: true,
        },
      ],
      store: this.records,
    });
  }

  // onExporting(e) {
  //   // const workbook = new Workbook();
  //   // const worksheet = workbook.addWorksheet('Sales');

  //   // exportPivotGrid({
  //   //   component: e.component,
  //   //   worksheet,
  //   // }).then(() => {
  //   //   workbook.xlsx.writeBuffer().then((buffer) => {
  //   //     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
  //   //   });
  //   // });
  //   // e.cancel = true;
  // }

  onCellPrepared({ cell, area, cellElement }: any) {
    cell.area = area;
    //console.log(cell)
    if (this.isHeaderCell(cell) || this.isDataCell(cell)) {
      // if (this.isTotalCell(cell)) {
      const appearance = this.getConditionalAppearance(cell);
      Object.assign(cellElement.style, this.getCssStyles(appearance));
      // }
    }
  }

  isTotalCell(cell: any) {
    return (
      cell.type === 'T' ||
      cell.type === 'GT' ||
      cell.rowType === 'T' ||
      cell.rowType === 'GT' ||
      cell.columnType === 'T' ||
      cell.columnType === 'GT'
    );
  }

  isHeaderCell(cell: any) {
    return cell.type === 'D';
  }

  isDataCell(cell: any) {
    return cell.columnType == 'D';
  }

  getConditionalAppearance(cell: any) {
    if (this.isTotalCell(cell)) {
      if (cell.dataType == 'number' && cell.value < 0) {
        return { fill: 'FFBF00', font: 'e81604', bold: true };
      } else {
        return { fill: 'FFBF00', font: '3F3F3F', bold: true };
      }
    } else {
      if (this.isHeaderCell(cell)) {
        return { fill: 'FFC7CE', font: '3F3F3F', bold: true };
      } else {
        return { fill: 'FFFFFF', font: '3F3F3F', bold: false };
      }
    }
    //return { fill: 'FFFFFF', font: '3F3F3F', bold: false };
  }

  getCssStyles({ fill, font, bold }: any) {
    return {
      'background-color': `#${fill}`,
      color: `#${font}`,
      'font-weight': bold ? 'bold' : undefined,
    };
  }
}
