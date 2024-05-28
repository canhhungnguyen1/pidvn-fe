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
import { environment } from 'src/environments/environment';
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

  @ViewChild('labelTable', { read: ElementRef })
  labelTable!: ElementRef;


  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private pihInventorySvc: PihInventoryService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  baseUrl = environment.baseUrl;

  requestId: any;
  requestNo: any;
  inventoryData: any;
  inventoryArea: any; // Khu vực kiểm kê
  goodsType: any; // Loại hàng : CX, CXN, CST, RT, NG ...
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

  errMsg: any

  /**
   * Các variable phần kiểm kê nvl thô
   */
  isOpenRawMaterialInventoryModal: boolean = false;
  isLoadingGetRawMaterialInventory: boolean = false;
  rawMaterialInventory: any;

  apiUploadExcelRawMaterialInventory: any;


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


    this.apiUploadExcelRawMaterialInventory = `${this.baseUrl}/PIH/Inventory/UploadRawMaterialInventoryData?requestId=${this.requestId}`
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

    let conditionScanInventory = new Date(this.inventoryRequestInfo.inventoryCloseDate).getDay() - new Date().getDay() 
    if (conditionScanInventory < 0) {
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

    // let reqDateStr = this.requestNo.split('-')[1];
    // let pattern = /(\d{4})(\d{2})(\d{2})/;
    // let reqDate = new Date(reqDateStr.replace(pattern, '$1-$2-$3'));
    // let curDate = new Date();
    // const diffTime = Math.abs(reqDate.getTime() - curDate.getTime());
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // if (diffDays > 15) {
    //   this.toastr.warning('Đã quá thời gian kiểm kê', 'Warning');
    //   return;
    // }
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
      .saveListInventoryData(this.listLotsScanned, this.requestId, this.inventoryArea, this.goodsType)
      .subscribe((response) => {
        this.toastr.success('Đã lưu', 'Response');
        this.resultSaveInventoryData = response;
        this.isOpenScanInventoryModal = false;
        this.isLoadingSaveInventoryData = false;
        this.isOpenResultSaveInventoryModal = true;
        this.mapLotsScanned = new Map();
        this.listLotsScanned = new Array();
        
        this.inventoryArea = null;
        this.goodsType = null;

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
  /**
   * Chọn loại hàng
   * @param event 
   */
  onChangeGoodsType(event: any) {
    console.log('onChangeGoodsType: ', event);
    
    this.labelIpt.nativeElement.select();
  }

  scanLabel(event: any) {

    if (!this.inventoryArea) {
      this.toastr.warning(
        `Cần chọn khu vực kiểm kê `,
        `${this.userLoginName} ơi !`
      );
      this.labelIpt.nativeElement.select();
      return;
    }

    if (!this.goodsType) {
      this.toastr.warning(
        `Cần chọn loại hàng `,
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

    if (event.target.value.includes(';')){

      // Tem to
      if (data[0] === 'B') {
        
        
        console.log('data[0]: ', data[0]);
        
        partNo = data[1];
        qty = data[3];
        lotNo = data[4];

        let obj = {
          lotNo: lotNo.toUpperCase(),
          partNo: partNo.toUpperCase(),
          qty: qty,
          date: new Date(),
          requestId: this.requestId,
          inventoryArea: this.inventoryArea,
          outerLotNo: lotNo.toUpperCase(),
          goodsType: this.goodsType
        };

        this.mapLotsScanned.set(lotNo, obj);
        this.listLotsScanned = Array.from(this.mapLotsScanned.values());
        this.totalQtyScanned = this.sumQtyScanned(this.listLotsScanned);

        return;
      }


      // Tem nhỏ
      if (data[0] !== 'B') {

        console.log('data[0]: ', data[0]);

        partNo = data[0];
        qty = data[2];
        lotNo = data[3];

        let obj = {
          lotNo: lotNo.toUpperCase(),
          partNo: partNo.toUpperCase(),
          qty: qty,
          date: new Date(),
          requestId: this.requestId,
          inventoryArea: this.inventoryArea,
          goodsType: this.goodsType
        };


        this.pihInventorySvc.scanLabel(obj.lotNo).subscribe(
          response => {
            this.mapLotsScanned.set(lotNo, obj);
            this.listLotsScanned = Array.from(this.mapLotsScanned.values());
            this.totalQtyScanned = this.sumQtyScanned(this.listLotsScanned);
            this.errMsg = null
            setTimeout(() => {
              this.scrollToBottom();
            }, 0);
            
          }, 
          error => {
            this.errMsg = error
          }
        );
        return
      }
    } else {
      // Trường hợp hàng Elektrisola

      lotNo = event.target.value.substring(1);

      this.pihInventorySvc.scanLabel(lotNo).subscribe((response) => {
        let data = Object.assign(response);

        let obj = {
          lotNo: lotNo,
          partNo: data.model,
          qty: data.qty,
          date: new Date(),
          requestId: this.requestId,
          inventoryArea: this.inventoryArea,
          goodsType: this.goodsType
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

  /**
   * Reset lại trạng thái scan tem
   */
  resetScanLabel() {
    this.listLotsScanned = new Array();
    this.mapLotsScanned = new Map();
    this.totalQtyScanned = 0;
    this.errMsg = null
  }

  /**
   * Scroll bảng scan label xuống dưới cùng
   */
  scrollToBottom(): void {
    try {
      const tableBody = this.labelTable.nativeElement.querySelector('.ant-table-body');
      tableBody.scrollTop = tableBody.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom of table', err);
    }
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
    this.resetScanLabel()
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




  /**
   * Kiểm kê nvl thô
   */


  openRawMaterialInventoryModal() {
    this.isOpenRawMaterialInventoryModal = true;
  }

  downloadTemplateUploadRawMaterialInventory() {
    this.pihInventorySvc.downloadTemplateUploadRawMaterialInventory().subscribe(
      response => {
        console.log(response);
      const blob = new Blob([response], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `TemplateRawMaterialInventoryData.xlsx`;
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
      }
    )
  }

  getRawMaterialInventoryData() {
    this.isLoadingGetRawMaterialInventory = true;
    this.pihInventorySvc.getRawMaterialInventoryData(this.requestId).subscribe(
      response => {
        this.rawMaterialInventory = response
        this.isLoadingGetRawMaterialInventory = false;
      },
      error => {
        this.isLoadingGetRawMaterialInventory = false;
      }
    )
  }
}
