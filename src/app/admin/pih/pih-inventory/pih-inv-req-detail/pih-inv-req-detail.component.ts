import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { PihInventoryService } from '../services/pih-inventory.service';
@Component({
  selector: 'app-pih-inv-req-detail',
  templateUrl: './pih-inv-req-detail.component.html',
  styleUrls: ['./pih-inv-req-detail.component.scss'],
})
export class PihInvReqDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('labelIpt') labelIpt!: ElementRef;
  @ViewChild('importQtyIpt') importQtyIpt!: ElementRef;
  @ViewChild(DxDataGridComponent, { static: false })
  balanceGrid!: DxDataGridComponent;

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private pihInventorySvc: PihInventoryService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  requestId: any;
  requestNo: any;
  inventoryData: any;
  inventoryArea: any; // Khu vực kiểm kê
  inventoryAreaList: any;
  isOpenScanInventoryModal: boolean = false;
  isOpenResultSaveInventoryModal: boolean = false;
  mapLotsScanned: Map<string, any> = new Map();
  listLotsScanned: Array<any> = new Array();
  totalQtyScanned: any = 0;

  lotNoEdit: string | null = null;
  inventoryDataOK: any;
  isLoadingSaveInventoryData: boolean = false;
  resultSaveInventoryData: any;
  inventoryDataPivot: any;

  userLoginName: any;
  inventoryRequestInfo: any;

  ngOnInit(): void {
    this.userLoginName = this.jwtHelperSvc
      .decodeToken(localStorage.getItem('accessToken')?.toString())
      .FullName.split(' ')
      .reverse()[0];

    this.requestId = Number(this.activatedRoute.snapshot.params['id']);
    this.requestNo = this.activatedRoute.snapshot.queryParamMap.get('reqNo');

    this.getInventoryData(this.requestId);
    this.getInventoryArea();
    this.getInventoryRequestById(this.requestId);
  }

  ngAfterViewInit(): void {}

  getInventoryRequestById(requestId: number) {
    this.pihInventorySvc
      .getInventoryRequestById(requestId)
      .subscribe((response) => {
        this.inventoryRequestInfo = response;
        console.log('inventoryRequestInfo: ', this.inventoryRequestInfo);
      });
  }

  getInventoryArea() {
    this.pihInventorySvc.getInventoryArea().subscribe((response) => {
      this.inventoryAreaList = response;
    });
  }

  getInventoryData(requestId: any) {
    this.pihInventorySvc.getInventoryData(requestId).subscribe((response) => {
      this.inventoryData = response;

      this.inventoryDataPivot = {
        fields: [
          {
            caption: 'Classified',
            dataField: 'classified',
            area: 'row',
            expanded: true,
          },
          {
            caption: 'Part Number',
            dataField: 'partNo',
            area: 'row',
            width: 150,
            expanded: true,
          },
          {
            caption: 'Lot No',
            dataField: 'lotNo',
            area: 'row',
            width: 250,
            expanded: true,
          },
          {
            caption: 'Qty',
            dataField: 'qty',
            dataType: 'number',
            area: 'data',
            summaryType: 'sum',
            format: {
              type: 'fixedPoint',
              precision: 2,
            },
          },
        ],
        store: response,
      };
    });
  }

  onExportClient($event: any) {}

  openScanInventoryModal() {

    if (
      new Date().getDay() >
      new Date(this.inventoryRequestInfo.inventoryCloseDate).getDay()
    ) {
      this.toastr.warning(
        `Đã quá thời hạn kiểm kê`,
        `${this.userLoginName} ơi !`
      );
      return;
    }

    /**
     * Kiểm tra phiếu đã quá thời gian kiểm kê chưa
     * Đang để lớn hơn 5 ngày sẽ không cho kiểm kê
     */

    let reqDateStr = this.requestNo.split('-')[1];
    let pattern = /(\d{4})(\d{2})(\d{2})/;
    let reqDate = new Date(reqDateStr.replace(pattern, '$1-$2-$3'));
    let curDate = new Date();
    const diffTime = Math.abs(reqDate.getTime() - curDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 15) {
      this.toastr.warning('Đã quá thời gian kiểm kê', 'Warning');
      return;
    }
    this.inventoryArea = null;
    this.isOpenScanInventoryModal = true;

    setTimeout(() => {
      this.labelIpt.nativeElement.focus();
    }, 500);
  }

  /**
   * Lưu list danh sách Lot đã scan
   * @returns
   */
  saveListInventoryData() {
    if (this.listLotsScanned.length <= 0) {
      this.toastr.warning('Cần scan tem QR code', 'Warning');
      return;
    }

    this.isLoadingSaveInventoryData = true;
    this.pihInventorySvc
      .saveListInventoryData(this.listLotsScanned)
      .subscribe((response) => {
        this.toastr.success('Đã lưu', 'Response');
        this.resultSaveInventoryData = response;
        this.isOpenScanInventoryModal = false;
        this.isLoadingSaveInventoryData = false;
        this.isOpenResultSaveInventoryModal = true;
        this.mapLotsScanned = new Map();
        this.listLotsScanned = new Array();

        this.getInventoryData(this.requestId);
      });
  }

  /**
   * Chọn khu vực kiểm kê
   * @param event
   */
  onChangeArea(event: any) {
    this.labelIpt.nativeElement.select();
  }

  scanLabel(event: any) {
    if (!this.inventoryArea) {
      this.toastr.warning(
        `Cần chọn khu vực kiểm kê`,
        `${this.userLoginName} ơi !`
      );
      this.labelIpt.nativeElement.select();
      return;
    }

    this.labelIpt.nativeElement.select();

    let data = event.target.value.split(';');

    let partNo = '';
    let qty = 0;
    let lotNo = '';

    if (event.target.value.includes(';')) {
      partNo = data[0];
      qty = data[2];
      lotNo = data[3];

      let obj = {
        lotNo: lotNo.toUpperCase(),
        partNo: partNo.toUpperCase(),
        qty: qty,
        requestId: this.requestId,
        inventoryArea: this.inventoryArea,
      };

      this.mapLotsScanned.set(lotNo, obj);

      this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();

      this.totalQtyScanned = this.sumQtyScanned(this.listLotsScanned);
      return;
    } else {
      // Trường hợp hàng Elektrisola

      lotNo = event.target.value.substring(1);

      this.pihInventorySvc.scanLabel(lotNo).subscribe((response) => {
        let data = Object.assign(response);

        let obj = {
          lotNo: lotNo,
          partNo: data.model,
          qty: data.qty,
          requestId: this.requestId,
          inventoryArea: this.inventoryArea,
        };

        this.mapLotsScanned.set(lotNo, obj);

        this.listLotsScanned = Array.from(
          this.mapLotsScanned.values()
        ).reverse();

        this.totalQtyScanned = this.sumQtyScanned(this.listLotsScanned);

        return;
      });
    }
  }

  /**
   * Tính tổng qty đã scan
   * @returns
   */
  private sumQtyScanned(listScanned: any): number {
    return listScanned.reduce((acc: any, item: any) => {
      return acc + Number(item.qty);
    }, 0);
  }

  startEdit(data: any) {
    setTimeout(() => {
      this.importQtyIpt.nativeElement.select();
    }, 400);
    this.lotNoEdit = data.lotNo;
  }

  stopEdit(): void {
    this.lotNoEdit = null;
    this.importQtyIpt.nativeElement.select();
  }

  deleteLabelScanned(data: any) {
    this.mapLotsScanned.delete(data.lotNo);
    this.listLotsScanned = Array.from(this.mapLotsScanned.values()).reverse();
  }

  closeScanInventoryModal() {
    this.isOpenScanInventoryModal = false;
  }

  isOpenEditQtyModal: boolean = false;
  lotSelected: any;
  openEditQtyModal(item: any) {
    this.lotSelected = item.data;

    this.isOpenEditQtyModal = true;
  }

  saveEditQty() {
    this.isOpenEditQtyModal = false;
    this.pihInventorySvc
      .saveInventoryData(this.lotSelected)
      .subscribe((response) => {
        this.getInventoryData(this.requestId);
      });
  }

  balanceData: any;
  inventoryAreaBalanceSrch: any = []; // chọn khu vực kiểm kê

  getBalance() {
    console.log('inventoryAreaBanlanceSrch: ', this.inventoryAreaBalanceSrch);

    let inventoryCloseDate = this.inventoryRequestInfo.inventoryCloseDate;
    let calculateTheoryDataDate =
      this.inventoryRequestInfo.calculateTheoryDataDate;

    let name = this.jwtHelperSvc
      .decodeToken(localStorage.getItem('accessToken')?.toString())
      .FullName.split(' ')
      .reverse()[0];

    this.balanceGrid?.instance.beginCustomLoading(`Bạn ${name} ơi đợi tý nhé!`);

    this.pihInventorySvc
      .balance(this.requestId, this.inventoryAreaBalanceSrch)
      .subscribe((response) => {
        this.balanceData = response;
      });
  }

  onRowPrepared(event: any) {
    if (event.rowType === 'data') {
      if (event.data.balance !== 0) {
        event.rowElement.style.backgroundColor = 'red';
        // or
        event.rowElement.classList.add('my-class');
        // to override alternation color
        event.rowElement.className = event.rowElement.className.replace(
          'dx-row-alt',
          ''
        );
      }
    }
  }
}
