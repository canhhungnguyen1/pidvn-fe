import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { IqcRequestDto } from '../models/IqcRequestDto';
import { IqcResultDto } from '../models/IqcResultDto';
import { PurWhRecordDto } from '../models/PurWhRecordDto';
import { IqcService } from '../services/iqc.service';

@Component({
  selector: 'app-iqc-request',
  templateUrl: './iqc-request.component.html',
  styleUrl: './iqc-request.component.scss',
})
export class IqcRequestComponent implements OnInit, AfterViewInit {
  @ViewChild(DxDataGridComponent, { static: false })
  iqcRequestGrid!: DxDataGridComponent;

  @ViewChild(DxDataGridComponent, { static: false })
  iqcDataGrid!: DxDataGridComponent;
  
  jwt: any;

  constructor(
    private toastr: ToastrService,
    private iqcSvc: IqcService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router
  ) {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
  }

  ngAfterViewInit(): void {
    const previousMonthDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    this.searchParams.dateRange = [previousMonthDate, new Date()];
    this.getIqcRequests();
    this.getSlipNo();
  }

  ngOnInit(): void {
    
  }

  iqcRequests!: IqcRequestDto[];
  purWhRecordDtos!: PurWhRecordDto[];
  iqcRequest: IqcRequestDto = new IqcRequestDto();
  iqcResults!: IqcResultDto[];

  isOpenIqcRequestOutSideModal: boolean = false;
  isOpenIqcRequestDetailModal: boolean = false;

  expandAll = true;
  isLoading: boolean = false;

  

  searchParams = {
    dateRange: [new Date(), new Date()],
  };

  getIqcRequests() {

    this.iqcRequestGrid?.instance.beginCustomLoading(
      `Đang load dữ liệu ...`
    );

    this.iqcSvc.getIqcRequests(this.searchParams).subscribe((response) => {
      this.iqcRequests = response.result;
      this.iqcRequestGrid.instance.endCustomLoading();
    });
  }

  getSlipNo() {
    this.iqcSvc.getSlipNo().subscribe((response) => {
      this.purWhRecordDtos = response.result;
    });
  }

  openIqcRequestOutSideModal() {
    // Check Role
    let userRoles = this.jwt.Roles;
    if (!userRoles.includes('Pur WH 1')) {
      this.toastr.warning('Bạn không có quyển tạo Request', 'Warning');
      return;
    }
    this.iqcRequest = new IqcRequestDto();
    this.isOpenIqcRequestOutSideModal = true;
  }

  redirectIqcReCheck() {
    let userRoles = this.jwt.Roles;
    if (!userRoles.includes('Pur WH 1')) {
      this.toastr.warning('Bạn không có quyển tạo Request', 'Warning');
      return;
    }

    this.router.navigate(['/admin/iqc/re-check']);
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

    this.isLoading = true;

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
        
        this.toastr.success('Tạo thành công', 'Success');
        this.isOpenIqcRequestOutSideModal = false;
        this.isLoading = false;
        this.getIqcRequests()
      },
      (error) => {
        this.isLoading = false;
        this.isOpenIqcRequestOutSideModal = false;
      }
    );
  }

  openIqcRequestDetailModal(event: any) {
    this.iqcResults = [];
    this.iqcRequest = event;
    this.isOpenIqcRequestDetailModal = true;

    this.iqcDataGrid?.instance.beginCustomLoading(
      `Đang load dữ liệu ...`
    );

    this.iqcSvc
      .previewRequestDetail(this.iqcRequest,"group")
      .subscribe((response) => {
        this.iqcResults = response.result;
        this.iqcDataGrid.instance.endCustomLoading();
      });
  }

  toggleExpandAll() {
    this.expandAll = !this.expandAll;
    this.iqcDataGrid.instance.clearGrouping();
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

  handleRequest(item: any) {
    let userRoles = this.jwt.Roles;

    if (userRoles.includes('PIH QA 2') || userRoles.includes('PIH QA-IQC')) {
      if (item.classParam == 'O' || item.classParam == null) {
        let request = { ...item };
        request.status = 2;

        this.iqcSvc.updateIqcRequest(request).subscribe((response) => {
          this.getIqcRequests();
        });

        return;
      }
      this.toastr.warning('Chỉ đánh giá IQC cho hàng OUTSIDE', 'Warining');
      return;
    }
    this.toastr.warning('Bạn không có quyền truy cập', 'Warning');
    return;
  }

  redirectIqcDetail(item: any) {

    let userRoles = this.jwt.Roles;
    if (userRoles.includes('PIH QA 2') || userRoles.includes('PIH QA-IQC')) {
      this.router.navigate(['admin/iqc/request', item.requestNo]);
      return
    }

    this.toastr.warning('Bạn không có quyền truy cập', 'Warning');
    return;
  }


  onCellPreparedIqcRequestGrid(e: any) {
    if (e.rowType === 'data' && e.column.dataField === 'statusName') {
      const statusValue = e.row.data.status;
      if (statusValue === 1) {
        e.cellElement.style.color = 'red'; // Màu chữ đỏ
      } else if(statusValue === 2) {
        e.cellElement.style.color = 'green';
      } else if(statusValue === 3) {
        e.cellElement.style.color = 'blue';
      }
    }


  }

  onCellPreparedIqcDataGrid(e: any) {
    if (e.rowType === 'data' ) {

      if (e.column.dataField === 'result1' || e.column.dataField === 'result2' || e.column.dataField === 'result3') {
        if (e.value === 'OK') {
          e.cellElement.style.color = 'green';
        }

        if (e.value === 'NG') {
          e.cellElement.style.color = 'red';
        }
      }


    }
  }



}
