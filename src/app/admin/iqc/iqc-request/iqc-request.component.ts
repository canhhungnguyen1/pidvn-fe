import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { IqcRequestDto } from '../models/IqcRequestDto';
import { IqcService } from '../services/iqc.service';
import { PurWhRecordDto } from '../models/PurWhRecordDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IqcResultDto } from '../models/IqcResultDto';
import { DxSelectBoxTypes } from 'devextreme-angular/ui/select-box';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-iqc-request',
  templateUrl: './iqc-request.component.html',
  styleUrl: './iqc-request.component.scss',
})
export class IqcRequestComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  iqcDataGrid!: DxDataGridComponent;

  constructor(
    private toastr: ToastrService,
    private iqcSvc: IqcService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  iqcRequests!: IqcRequestDto[];
  purWhRecordDtos!: PurWhRecordDto[];
  iqcRequest!: IqcRequestDto;
  iqcResults!: IqcResultDto[];

  isOpenIqcRequestOutSideModal: boolean = false;
  isOpenIqcRequestDetailModal: boolean = false;

  expandAll = true;

  ngOnInit(): void {
    let firstDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    this.searchParams.dateRange = [firstDayOfMonth, new Date()];

    this.getIqcRequests();
    this.getSlipNo();
  }

  searchParams = {
    dateRange: [new Date(), new Date()],
  };

  getIqcRequests() {
    this.iqcSvc.getIqcRequests(this.searchParams).subscribe((response) => {
      this.iqcRequests = response.result;
    });
  }

  getSlipNo() {
    this.iqcSvc.getSlipNo().subscribe((response) => {
      this.purWhRecordDtos = response.result;
    });
  }

  openIqcRequestOutSideModal() {
    this.iqcRequest = new IqcRequestDto();
    this.isOpenIqcRequestOutSideModal = true;
  }

  /**
   * Chọn invoice để tạo IQC (OUTSIDE)
   */
  onSelectInvoice(event: any) {
    const item = this.purWhRecordDtos.find((item) => item.invoice === event);
    if (item) {
      this.iqcRequest.slipNo = item.slipNo; // item chắc chắn không undefined
    } else {
      // Xử lý trường hợp không tìm thấy item
      this.toastr.warning(
        `Không tìm thấy RequestNo tương ứng với Invoice ${event}`,
        'Warning'
      );
      return;
    }
  }

  /**
   * Tạo request IQC (OUTSIDE)
   */
  createIqcRequestOutSide() {
    if (!this.iqcRequest.invoice || !this.iqcRequest.supplier) {
      this.toastr.warning('Cần nhập đủ thông tin', 'Warning');
      return;
    }

    let requestedBy = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let requestedById = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).UserId;

    this.iqcRequest.type = 'N';
    this.iqcRequest.status = 1;
    this.iqcRequest.requestedBy = requestedBy;
    this.iqcRequest.requestedById = requestedById;

    console.log(this.iqcRequest);

    this.iqcSvc.createIqcRequest(this.iqcRequest).subscribe(
      (response) => {
        this.getIqcRequests();
        this.toastr.success('Tạo thành công', 'Success');
        this.isOpenIqcRequestOutSideModal = false;
      },
      (error) => {
        this.isOpenIqcRequestOutSideModal = false;
      }
    );
  }

  openIqcRequestDetailModal(event: any) {
    this.iqcResults = [];
    this.iqcRequest = event;
    this.isOpenIqcRequestDetailModal = true;

    this.iqcSvc
      .getIqcResults(this.iqcRequest.requestNo)
      .subscribe((response) => {
        this.iqcResults = response.result;
      });
  }

  
  toggleExpandAll() {
    this.expandAll = !this.expandAll;
    this.iqcDataGrid.instance.clearGrouping();
    // this.iqcDataGrid.instance.columnOption(e.value, 'groupIndex', 0);
  }

  toggleGroupColumn(e: DxSelectBoxTypes.ValueChangedEvent) {
    this.iqcDataGrid.instance.clearGrouping();
    this.iqcDataGrid.instance.columnOption(e.value, 'groupIndex', 0);
    // this.iqcDataGrid = this.getGroupCount(e.value);
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
          'IQC-DATA.xlsx'
        );
      });
    });
  }
}
