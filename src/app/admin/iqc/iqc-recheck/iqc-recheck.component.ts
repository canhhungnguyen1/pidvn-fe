import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { IqcRequestDto } from '../models/IqcRequestDto';
import { IqcResultDto } from '../models/IqcResultDto';
import { IqcService } from '../services/iqc.service';

@Component({
  selector: 'app-iqc-recheck',
  templateUrl: './iqc-recheck.component.html',
  styleUrl: './iqc-recheck.component.scss',
})
export class IqcRecheckComponent implements OnInit {
  @ViewChild('pihStoreMasterGrid') pihStoreMasterGrid!: DxDataGridComponent;
  @ViewChild('pihStoreDetailGrid') pihStoreDetailGrid!: DxDataGridComponent;

  

  constructor(
    private toastr: ToastrService,
    private iqcSvc: IqcService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router
  ) {}

  selectedRows: any = []
  iqcResults!: IqcResultDto[];
  isOpenCreateModalRequest: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getLotsInventory();
  }

  pihStoreDetails!: [];
  pihStoreMasters!: [];
  iqcResultPrepare!: any[];
  iqcRequest: IqcRequestDto = new IqcRequestDto();

  getLotsInventory() {
    this.iqcSvc.getLotsInventory().subscribe((response) => {
      console.log(response.result);
      
      this.pihStoreDetails = response.result.details;
      this.pihStoreMasters = response.result.masters;
    });
  }

  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
  }

  resetFiltersAndSorting() {
    this.pihStoreMasterGrid.instance.clearFilter();
    this.pihStoreMasterGrid.instance.clearSorting();
    this.pihStoreMasterGrid.instance.clearSelection();
    this.pihStoreDetailGrid.instance.clearFilter();
    this.pihStoreDetailGrid.instance.clearSorting();
    this.pihStoreDetailGrid.instance.clearSelection();
  }

  openCreateModalRequest() {
    let classParams = new Set();
    let lotGroups = new Array();

    for (const item of this.selectedRows) {
      classParams.add(item.classParam);
      lotGroups.push(item.lotGroup);
    }

    console.log(lotGroups);

    if (classParams.size >= 2) {
      this.toastr.warning(
        'Chỉ chọn 1 loại hàng cho 1 request (OUTSIDE hoặc PIH)',
        'Warning'
      );
      return;
    }

    this.isLoading = true;

    this.iqcRequest = new IqcRequestDto();
    this.iqcRequest.classParam = classParams.values().next().value;

    let searchParams = {
      lotGroups: lotGroups,
    };
    this.iqcSvc.prepareDataCreateRequest(searchParams).subscribe(
      (response) => {
        console.log(response);
        this.iqcResultPrepare = response.result;
        this.isOpenCreateModalRequest = true;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  closeCreateModalRequest() {
    this.resetFiltersAndSorting();
    this.isOpenCreateModalRequest = false;
  }

  /**
   * Thực hiện insert vào bảng iqc_result
   */
  createRequest() {
    if (!this.iqcRequest.type) {
      this.toastr.warning('Cần chọn loại Request', 'Warning');
      return;
    }

    let requestedBy = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let requestedById = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).UserId;

    this.iqcRequest.status = 1;
    this.iqcRequest.requestedBy = requestedBy;
    this.iqcRequest.requestedById = requestedById;

    let lotNos = new Array();

    for (const item of this.iqcResultPrepare) {
      lotNos.push(item.lotNo);
    }

    this.iqcRequest.lotNos = lotNos;

    this.isLoading = true;
    this.iqcSvc.createIqcRequest(this.iqcRequest).subscribe(
      (response) => {
        console.log(response);
        this.getLotsInventory();
        this.isLoading = false;
        this.closeCreateModalRequest()
      },
      (error) => {
        this.isLoading = false;
        this.isOpenCreateModalRequest = false;
        this.closeCreateModalRequest()
      }
    );

    //   this.iqcRequest.iqcResults = iqcResults;

    //   this.iqcSvc.createIqcRequest(this.iqcRequest).subscribe(
    //     (response) => {
    //       this.getLotsInventory();
    //       this.toastr.success('Tạo thành công', 'Success');
    //       this.isOpenCreateModalRequest = false;
    //       this.isLoading = false;
    //     },
    //     (error) => {
    //       this.isLoading = false;
    //       this.isOpenCreateModalRequest = false;
    //     }
    //   );
  }
}
