import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDateBoxModule,
  DxDateRangeBoxModule,
  DxDropDownBoxModule,
  DxFormModule,
  DxHtmlEditorModule,
  DxMapModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { QaMaterialCheckSheetService } from './qa-material-checksheet.service';

@Component({
  selector: 'app-qa-material-checksheet',
  standalone: true,
  imports: [
    DxDataGridModule,
    NzIconModule,
    NzModalModule,
    DxButtonModule,
    DxDateBoxModule,
    DxDateRangeBoxModule,
    DxDropDownBoxModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxMapModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    NzButtonModule,
  ],
  templateUrl: './qa-material-checksheet.component.html',
  styleUrl: './qa-material-checksheet.component.scss',
})
export class QaMaterialChecksheetComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false })
  psMasterGrid!: DxDataGridComponent;

  constructor(
    private router: Router,
    private qaMaterialCheckSheetSvc: QaMaterialCheckSheetService,
    private jwtSvc: JwtHelperService,
    private toastr: ToastrService
  ) {
    this.jwt = this.jwtSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
  }

  ngOnInit(): void {
    this.getQaCards();
  }

  searchParams = {
    dateRange: [new Date(), new Date()],
  };

  jwt: any;
  qaCards: any;
  isOpenPsMasterModal: boolean = false;
  qaCardSelected: any;
  psMasters: any

  getQaCards() {
    this.qaMaterialCheckSheetSvc.getQACards().subscribe((response) => {
      this.qaCards = response.result;
    });
  }

  openPsMasterDetailModal(event: any) {
    console.log('openPsMasterDetailModal: ', event);
    this.qaCardSelected = event
    this.isOpenPsMasterModal = true;

    this.psMasterGrid.instance.beginCustomLoading(`Đang load dữ liệu ...`);

    this.qaMaterialCheckSheetSvc.getPsMasters(event.qaCard).subscribe(
      response => {
        this.psMasters = response.result
        this.psMasterGrid.instance.endCustomLoading();
      }
    )


  }
}
