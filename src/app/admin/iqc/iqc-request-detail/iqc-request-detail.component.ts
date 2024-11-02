import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  styleUrl: './iqc-request-detail.component.scss',
})
export class IqcRequestDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('iqcDataGrid') iqcDataGrid!: DxDataGridComponent;

  constructor(
    private toastr: ToastrService,
    private iqcSvc: IqcService,
    private jwtHelperSvc: JwtHelperService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this.getIqcRequest();
    this.getIqcResults();
    this.getIqcLevelOfControls();
  }

  ngOnInit(): void {}

  isOpenEvaluateModal: boolean = false;
  iqcRequest: IqcRequestDto = new IqcRequestDto();
  iqcResults!: IqcResultDto[];
  iqcLevelOfControls!: any[];
  historyLevelOfControls!: any[];
  evaluateData: EvaluateDto = new EvaluateDto();
  selectedRows: any;
  isLoading: boolean = false;
  isOpenLevelOfControlModal: boolean = false;
  searchParam: any;
  isChecked: boolean = false;

  getIqcRequest() {
    let requestNo =
      this.activatedRoute.snapshot.paramMap.get('requestNo') ?? '';
    this.iqcSvc.getIqcRequest(requestNo).subscribe((response) => {
      this.iqcRequest = response.result;
      this.iqcRequest.status == 3
        ? (this.isChecked = true)
        : (this.isChecked = false);
    });
  }

  getIqcResults() {
    this.iqcDataGrid?.instance.beginCustomLoading(`Đang load dữ liệu ...`);

    let requestNo =
      this.activatedRoute.snapshot.paramMap.get('requestNo') ?? '';
    this.iqcSvc.getIqcResults(requestNo).subscribe((response) => {
      this.iqcResults = response.result;
      this.iqcDataGrid.instance.endCustomLoading();
    });
  }

  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
  }

  openEvaluateModal() {
    this.evaluateData = new EvaluateDto();
    console.log('openEvaluateModal: ', this.selectedRows);
    this.isOpenEvaluateModal = true;
  }

  closeEvaluateModal() {
    this.resetFiltersAndSorting();
    this.isOpenEvaluateModal = false;
  }

  resetFiltersAndSorting() {
    this.iqcDataGrid.instance.clearFilter();
    this.iqcDataGrid.instance.clearSorting();
    this.iqcDataGrid.instance.clearSelection();
  }

  getIqcLevelOfControls() {
    this.iqcSvc.getIqcLevelOfControls().subscribe((response) => {
      this.iqcLevelOfControls = response.result;
    });
  }

  getHistoryLevelOfControls() {
    this.iqcSvc
      .getHistoryLevelOfControls(this.searchParam.model)
      .subscribe((response) => {
        this.historyLevelOfControls = response.result;
      });
  }

  saveEvaluateData() {
    this.isLoading = true;
    let checkUser = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).UserId;

    for (const item of this.selectedRows) {
      item.result1 = this.evaluateData.result1;
      item.result2 = this.evaluateData.result2;
      item.result3 = this.evaluateData.result3;
      item.levelOfControl1 = this.evaluateData.levelOfControl1;
      item.levelOfControl2 = this.evaluateData.levelOfControl2;
      item.remark = this.evaluateData.remark;
      item.checkDate = new Date();
      item.checkUser = checkUser;
    }

    this.iqcSvc.evaluateLotNos(this.selectedRows).subscribe(
      (response) => {
        this.isLoading = false;
        this.isOpenEvaluateModal = false;
        this.getIqcResults();
        this.resetFiltersAndSorting();
      },
      (error) => {
        this.isLoading = false;
        this.isOpenEvaluateModal = false;
        this.getIqcResults();
        this.resetFiltersAndSorting();
      }
    );
  }

  openLevelOfControlModal() {
    this.searchParam = {};
    this.isOpenLevelOfControlModal = true;
  }

  onExportClient(event: any) {
    // console.log(event);

    // const workbook = new Workbook();
    //     const worksheet = workbook.addWorksheet('Main sheet');
    //     exportDataGrid({
    //         component: event.component,
    //         worksheet: worksheet
    //     }).then(function() {
    //         workbook.xlsx.writeBuffer()
    //             .then(function(buffer: BlobPart) {
    //                 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'IQC-DATA.xlsx');
    //             });
    //     });

    this.iqcSvc.exportExcel(this.iqcRequest).subscribe((response) => {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `${this.iqcRequest.requestNo}.xlsx`;
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

  updateStatusRequest(event: any) {
    console.log(event);

    event === true ? this.iqcRequest.status = 3 : this.iqcRequest.status = 2 
    
    let request = {...this.iqcRequest}

    this.iqcSvc.updateIqcRequest(request).subscribe(
      response => {
        this.iqcRequest = response.result
      }
    )
  }
}
