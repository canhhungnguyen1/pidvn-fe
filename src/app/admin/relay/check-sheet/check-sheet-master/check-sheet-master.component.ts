import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CheckSheetService } from '../services/check-sheet.service';

@Component({
  selector: 'app-check-sheet-master',
  templateUrl: './check-sheet-master.component.html',
  styleUrls: ['./check-sheet-master.component.scss'],
})
export class CheckSheetMasterComponent implements OnInit {
  constructor(
    private router: Router,
    private checkSheetSvc: CheckSheetService,
    private toastr: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  masters: any;

  searchVo: any = {};

  lines: any = ['TB1', 'TB2', 'TB3', 'TB4', 'TE1', 'TE2', 'TL1', 'TL2'];

  masterSelected: any;

  isOpenApproveModal: boolean = false;

  ngOnInit(): void {
    this.getCheckSheetMaster();
  }

  getCheckSheetMaster() {
    this.checkSheetSvc
      .getCheckSheetMaster(this.searchVo)
      .subscribe((response) => {
        this.masters = response;
        console.log(this.masters);
      });
  }

  redirectToProcess(data: any) {
    console.log('Master: ', data);
    this.router.navigate(['admin/relay/check-sheet/process'], {
      queryParams: { master: data.id, line: data.line, model: data.model },
    });
  }

  onSearch() {
    console.log('SearchVo : ', this.searchVo);
    this.getCheckSheetMaster();
  }

  onExportData(master: any) {
    console.log('DATA: ', master);

    this.checkSheetSvc.exportData(master).subscribe((response) => {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   window.navigator.msSaveOrOpenBlob(blob);
      //   return;
      // }

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `${master.qaCard}.xlsx`;
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

  // Handle date picker
  onChange(result: any): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  onOk(result: any | Date[] | null): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  onCalendarChange(result: Array<Date | null>): void {
    this.searchVo.fromDate = result[0];
    this.searchVo.toDate = result[1];
  }

  // Xử lý Approve CheckSheet
  openApproveModal(master: any) {
    this.isOpenApproveModal = true;
    this.masterSelected = {...master};
  }

  onApprove() {
    console.log('Approve : ', this.masterSelected);
    if (!this.masterSelected.remark || !this.masterSelected.approveStatus) {
      this.toastr.warning('Warning', 'Cần nhập đủ thông tin !');
      return;
    }
    
    let approveBy = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.masterSelected.approveBy = approveBy;

    this.checkSheetSvc
      .approveCheckSheet(this.masterSelected)
      .subscribe((response) => {
        this.toastr.success('Đã xác nhận !','Approve');
        this.getCheckSheetMaster();
        this.isOpenApproveModal = false;
      });
  }

  onCancelApprove() {
    this.isOpenApproveModal = false;
  }
}
