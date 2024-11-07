import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RePrService } from '../services/re-pr.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { LotDto } from 'src/app/admin/warehouse/wh-iqc-recheck/models/LotDto';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-re-pr-receive',
  templateUrl: './re-pr-receive.component.html',
  styleUrl: './re-pr-receive.component.scss',
})
export class RePrReceiveComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false })
  lotGrid!: DxDataGridComponent;


  expandAll = true;

  constructor(
    private toastr: ToastrService,
    private rePrSvc: RePrService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.requestNo = this.activatedRoute.snapshot.queryParamMap.get('requestNo');
    this.getRequestDetail();
  }

  lots: LotDto[] = [];
  requestNo: any;

  getRequestDetail() {
    let requestNo = this.activatedRoute.snapshot.queryParamMap.get('requestNo');

    this.rePrSvc.getRequestDetail(requestNo).subscribe((response) => {
      this.lots = response.result;
    });
  }

  onExportClient(event: any) {
    console.log(event);

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


  toggleExpandAll() {
    this.expandAll = !this.expandAll;

    
    const grid = this.lotGrid.instance;  // Lấy instance của DataGrid
    grid.collapseRow(1);  // Thu gọn nhóm đầu tiên (theo groupIndex = 0)
   
    
  }


  statusCellTemplate(cellElement: any, cellInfo: any) {

    console.log('cellElement: ', cellElement);
    
    console.log('cellInfo: ', cellInfo);
    

  }





}
