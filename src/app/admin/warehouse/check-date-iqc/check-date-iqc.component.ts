import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { CheckDateIqcService } from './services/check-date-iqc.service';

@Component({
  selector: 'app-check-date-iqc',
  templateUrl: './check-date-iqc.component.html',
  styleUrls: ['./check-date-iqc.component.scss'],
})
export class CheckDateIqcComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  iqcRequestDetails: any;
  iqcRequests: any;
  isOpenIqcRequestModal: boolean = false;
  isOpenIqcDetailModal: boolean = false;
  searchVo: any = {};
  iqcRequest: any = {};
  invoices: any;
  iqcRequestSelected: any;
  slipNos: any;
  data: any;
  constructor(
    private toastr: ToastrService,
    private checkDateIqcSvc: CheckDateIqcService,
    private jwtHelperService: JwtHelperService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.getDataIqcCheckDate();
    // }, 5000)
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getDataIqcCheckDate();
  }

  getDataIqcCheckDate() {
    let today = new Date();
    let thisTimeAgo = today.setMonth(today.getMonth() - 1);
    let dateTimeAgo = this.datepipe.transform(thisTimeAgo, 'yyyy-MM');
    this.dataGrid.instance.beginCustomLoading('Loading');
    this.checkDateIqcSvc
      .getCheckLotNoIqc({ month: dateTimeAgo })
      .subscribe((response) => {
        this.dataGrid.instance.endCustomLoading();
        this.data = response;
      });
    console.log(this.data);
  }
}
