import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IqcService } from '../services/iqc.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { IqcResultDto } from '../models/IqcResultDto';
import { IqcRequestDto } from '../models/IqcRequestDto';

@Component({
  selector: 'app-iqc-recheck',
  templateUrl: './iqc-recheck.component.html',
  styleUrl: './iqc-recheck.component.scss'
})
export class IqcRecheckComponent implements OnInit {

  @ViewChild('pihStoreGrid') pihStoreGrid!: DxDataGridComponent;

  constructor(
    private toastr: ToastrService,
    private iqcSvc: IqcService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router
  ) {}

  selectedRows: any;
  iqcResults!: IqcResultDto []; 
  isOpenCreateModalRequest: boolean = false
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getLotsInventory();
  }

  pihStores!: []
  iqcRequest: IqcRequestDto = new IqcRequestDto()


  getLotsInventory() {
    this.iqcSvc.getLotsInventory().subscribe(
      response => {
        this.pihStores = response.result
      }
    )
  }

  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
  }

  resetFiltersAndSorting() {
    this.pihStoreGrid.instance.clearFilter();
    this.pihStoreGrid.instance.clearSorting();
    this.pihStoreGrid.instance.clearSelection()
  }

  openCreateModalRequest() {
    console.log(this.selectedRows);

    this.iqcRequest = new IqcRequestDto()
    
    this.isOpenCreateModalRequest = true
  }

  closeCreateModalRequest() {
    this.resetFiltersAndSorting();
    this.isOpenCreateModalRequest = false;
  }

  createRequest() {
    

    let requestedBy = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let requestedById = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).UserId;

    this.iqcRequest.status = 1;
    this.iqcRequest.requestedBy = requestedBy;
    this.iqcRequest.requestedById = requestedById;


    let iqcResults = [...this.selectedRows];
    
    for (const item of iqcResults) {
      item.qty = item.wh
    }
    
    this.iqcRequest.iqcResults = iqcResults

    this.iqcSvc.createIqcRequest(this.iqcRequest).subscribe(
      (response) => {
        this.getLotsInventory();
        this.toastr.success('Tạo thành công', 'Success');
        this.isOpenCreateModalRequest = false;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.isOpenCreateModalRequest = false;
      }
    );
    
  }

}
