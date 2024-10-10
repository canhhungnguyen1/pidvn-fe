import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { WhIqcRecheckService } from './services/wh-iqc-recheck.service';
import { RequestDto } from './models/RequestDto';

@Component({
  selector: 'app-wh-iqc-recheck',
  templateUrl: './wh-iqc-recheck.component.html',
  styleUrl: './wh-iqc-recheck.component.scss',
})
export class WhIqcRecheckComponent implements OnInit, AfterViewInit {
  @ViewChild('qrIpt') qrIpt!: ElementRef;
  @ViewChild(DxDataGridComponent, { static: false })

  lotsOver6MonthGrid!: DxDataGridComponent;
  isOpenCreateIqcRequestModal = false;

  ngOnInit(): void {}

  constructor(
    private toastr: ToastrService,
    private whIqcRecheckSvc: WhIqcRecheckService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  ngAfterViewInit(): void {
    this.getLotGroupsIqcOver6Month()
  }

  lotsOver6Month: any;

  openCreateIqcRequestModal() {
    this.isOpenCreateIqcRequestModal = true;
  }

  createRequest() {

    let lotGroups = new Array();

    for (const element of this.selectedRows) {
      lotGroups.push(element.lotGroup)
    }
    
    
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let requestDto = new RequestDto();
    requestDto.requestedBy = username
    requestDto.type = "6Month"
    requestDto.lotGroups = lotGroups


    console.log(requestDto);
    


    this.whIqcRecheckSvc.createIqcRequest(requestDto).subscribe(
      response => {
        this.lotsOver6MonthGrid.instance.clearSelection();
        this.toastr.success('OK','Success')
      }
    )

  }



  getLotGroupsIqcOver6Month() {
    this.lotsOver6MonthGrid?.instance.beginCustomLoading(
      `Đang lấy dữ liệu hàng tồn kho quá 6 tháng chưa IQC`
    );

    this.whIqcRecheckSvc.getLotGroupsIqcOver6Month().subscribe(
      response => {
        this.lotsOver6Month = response.result
        this.lotsOver6MonthGrid.instance.endCustomLoading();
      },
      error => {
        this.lotsOver6MonthGrid.instance.endCustomLoading();
      }
    )
  }

  selectedRows: any;
  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
  }

}
