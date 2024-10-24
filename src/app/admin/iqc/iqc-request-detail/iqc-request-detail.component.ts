import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IqcService } from '../services/iqc.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IqcResultDto } from '../models/IqcResultDto';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { IqcRequestDto } from '../models/IqcRequestDto';
import { EvaluateDto } from '../models/EvaluateDto';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-iqc-request-detail',
  templateUrl: './iqc-request-detail.component.html',
  styleUrl: './iqc-request-detail.component.scss'
})
export class IqcRequestDetailComponent implements OnInit {

  @ViewChild('iqcDataGrid') iqcDataGrid!: DxDataGridComponent;

  constructor(
    private toastr: ToastrService,
    private iqcSvc: IqcService,
    private jwtHelperSvc: JwtHelperService,
    private activatedRoute: ActivatedRoute,
  ) {}

  isOpenEvaluateModal: boolean = false
  iqcRequest: IqcRequestDto = new IqcRequestDto();
  iqcResults!: IqcResultDto [];
  iqcLevelOfControls!: any [];
  evaluateData: EvaluateDto = new EvaluateDto();
  selectedRows: any;

  ngOnInit(): void {
    this.getIqcRequest();
    this.getIqcResults();
    this.getIqcLevelOfControls();
  }

  getIqcRequest() {
    let requestNo = this.activatedRoute.snapshot.paramMap.get('requestNo')?? '';
    this.iqcSvc.getIqcRequest(requestNo).subscribe(
      response => {
        this.iqcRequest = response.result
      }
    )
  }

  getIqcResults() {
    let requestNo = this.activatedRoute.snapshot.paramMap.get('requestNo')?? '';
    this.iqcSvc.getIqcResults(requestNo).subscribe(
      response => {
        this.iqcResults = response.result
      }
    )
  }

  
  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
  }

  openEvaluateModal() {
    this.evaluateData = new EvaluateDto();
    console.log('openEvaluateModal: ', this.selectedRows);
    this.isOpenEvaluateModal = true
  }

  closeEvaluateModal() {
    this.resetFiltersAndSorting();
    this.isOpenEvaluateModal = false;
  }

  resetFiltersAndSorting() {
    this.iqcDataGrid.instance.clearFilter();
    this.iqcDataGrid.instance.clearSorting();
    this.iqcDataGrid.instance.clearSelection()
  }

  getIqcLevelOfControls() {
    this.iqcSvc.getIqcLevelOfControls().subscribe(
      response => {
        this.iqcLevelOfControls = response.result
      }
    )
  }

  saveEvaluateData() {
    let checkUser = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).UserId;

    for(const item of this.selectedRows) {
      item.result1 = this.evaluateData.result1
      item.result2 = this.evaluateData.result2
      item.result3 = this.evaluateData.result3
      item.levelOfControl1 = this.evaluateData.levelOfControl1
      item.levelOfControl2 = this.evaluateData.levelOfControl2
      item.remark = this.evaluateData.remark
      item.checkDate = new Date();
      item.checkUser = checkUser
    }

    this.iqcSvc.evaluateLotNos(this.selectedRows).subscribe(
      response => {
        this.isOpenEvaluateModal = false
        this.getIqcResults();
        this.resetFiltersAndSorting();
      }
    )
    
    
  }


  onExportClient(event: any) {
    console.log(event);
    
    const workbook = new Workbook();    
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
            component: event.component,
            worksheet: worksheet
        }).then(function() {
            workbook.xlsx.writeBuffer()
                .then(function(buffer: BlobPart) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'IQC-DATA.xlsx');
                });
        });
  }

}
