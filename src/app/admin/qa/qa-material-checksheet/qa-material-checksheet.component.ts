import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent, DxTextBoxComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { QaMaterialCheckSheetService } from './qa-material-checksheet.service';

@Component({
  selector: 'app-qa-material-checksheet',
  templateUrl: './qa-material-checksheet.component.html',
  styleUrl: './qa-material-checksheet.component.scss',
})
export class QaMaterialChecksheetComponent implements OnInit {
  @ViewChild('labelIpt') labelIpt!: DxTextBoxComponent;

  @ViewChild(DxDataGridComponent, { static: false })
  psMasterGrid!: DxDataGridComponent;

  @ViewChild(DxDataGridComponent, { static: false })
  qaCardGrid!: DxDataGridComponent;

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
    let today = new Date();
    this.searchParams.dateRange = [
      new Date(today.setDate(today.getDate() - 1)),
      new Date(),
    ];

    this.getQaCards();
  }

  searchParams = {
    dateRange: [new Date(), new Date()],
  };

  jwt: any;
  qaCards: any;
  isOpenPsMasterModal: boolean = false;
  qaCardSelected: any;
  psMasters: any;
  isOpenConfirmChecksheetModal: boolean = false;

  psMasterArr: any;
  checkSheetRecords: any;

  getQaCards() {
    this.qaCardGrid?.instance.beginCustomLoading(`Đang load dữ liệu ...`);

    this.qaMaterialCheckSheetSvc
      .getQACards(this.searchParams)
      .subscribe((response) => {
        this.qaCards = response.result;
        this.qaCardGrid?.instance.endCustomLoading();
      });
  }

  openPsMasterDetailModal(event: any) {
    this.psMasters = [];
    console.log('openPsMasterDetailModal: ', event);
    this.qaCardSelected = event;
    this.isOpenPsMasterModal = true;

    this.psMasterGrid.instance.beginCustomLoading(`Đang load dữ liệu ...`);

    this.qaMaterialCheckSheetSvc
      .getCheckSheetRecords(event.qaCard)
      .subscribe((response) => {
        this.checkSheetRecords = response.result;
        this.psMasterGrid.instance.endCustomLoading();
      });

    this.qaMaterialCheckSheetSvc
      .getPsMasters(event.qaCard)
      .subscribe((response) => {
        this.psMasters = response.result;
        this.psMasterArr = this.convertPsMasterToArray(this.psMasters);
        
      });

    
  }

  convertPsMasterToArray(psMasters: any) {
    let arr: any = [];
    for (const element of psMasters) {
      arr.push(element.pncomp);
    }
    return arr;
  }

  onCellPreparedPsMasterGrid(e: any) {
    if (e.rowType === 'data') {
      if (e.column.dataField === 'cpn') {
        if (e.value === null) {
          e.cellElement.innerText = 'Không sử dụng hoặc sai NVL';
        }
      }
    }
  }

  openConfirmChecksheetModal() {
    this.isOpenConfirmChecksheetModal = true;
  }

  handleConfirmChecksheet() {
    this.qaCardSelected.createdBy = this.jwt.Username;

    console.log('aaa: ', this.qaCardSelected);

    this.qaMaterialCheckSheetSvc
      .confirmCheckSheet(this.qaCardSelected)
      .subscribe((response) => {
        this.getQaCards();
        this.isOpenConfirmChecksheetModal = false;
        this.isOpenPsMasterModal = false;
      });
  }

  scanMaterial(event: any) {
    let dataScan = event.target.value;

    let arr = dataScan.split(';');

    let partNo = arr[0] === 'B' ? arr[1] : arr[0];
    let lotNo = arr[0] === 'B' ? arr[4] : arr[3];
    let label = dataScan;

    let obj: any = {
      qaCard: this.qaCardSelected.qaCard,
      lotNo: lotNo,
      label: label,
    };

    if (!this.psMasterArr.includes(partNo)) {
      this.toastr.error('SAI NVL');
      obj.remark = 'SAI NVL';
    }

    this.qaMaterialCheckSheetSvc.scanMaterial(obj).subscribe(
      response => {
        this.checkSheetRecords = response.result.data
      }
    )


    this.selectTextInput('labelIpt');
  }

  selectTextInput(input: string) {
    if (input === 'labelIpt') {
      const inputElement = this.labelIpt.instance
        .element()
        .querySelector('input');
      if (inputElement) {
        inputElement.select();
        return;
      }
    }
  }
}
