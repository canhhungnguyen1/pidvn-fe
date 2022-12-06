import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { WasteMngService } from '../services/waste-mng.service';

@Component({
  selector: 'app-waste-master-data',
  templateUrl: './waste-master-data.component.html',
  styleUrls: ['./waste-master-data.component.scss'],
})
export class WasteMasterDataComponent implements OnInit {
  constructor(
    private jwtHelperService: JwtHelperService,
    private toastr: ToastrService,
    private wasteMngSvc: WasteMngService
  ) {}

  masterDatas: any;
  companies: any;
  companySelected: any;
  wasteGroups: any;
  wasteGroupSelected: any;
  isOpenMasterModal: boolean = false;

  ngOnInit(): void {
    this.getWasteMasterData();
    this.getWasteGroup();
    this.getHandleCompany();
  }

  getWasteGroup() {
    this.wasteMngSvc.getWasteGroup().subscribe((response) => {
      this.wasteGroups = response;
    });
  }

  getHandleCompany() {
    this.wasteMngSvc.getHandleCompany().subscribe((response) => {
      this.companies = response;
    });
  }

  createWasteMasterData() {
    let createdBy = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let masterVo = {
      wasteGroup: this.wasteGroupSelected,
      handleCompany: this.companySelected,
      createdBy: createdBy,
    };

    if (!this.wasteGroupSelected || !this.companySelected) {
      this.toastr.warning('Cần nhập đủ thông tin !');
      return;
    }

    this.wasteMngSvc.createWasteMasterData(masterVo).subscribe((response) => {
      this.isOpenMasterModal = false;
      this.getWasteMasterData();
    });
  }

  getWasteMasterData() {
    this.wasteMngSvc.getWasteMasterData({}).subscribe((response) => {
      this.masterDatas = response;
    });
  }

  onDelete(id: any) {
    this.wasteMngSvc.removeWasteMasterData(id).subscribe((response) => {
      this.toastr.success('Đã xóa');
      this.getWasteMasterData();
    });
  }
}
