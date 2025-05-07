import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { QaOqcService } from 'src/app/admin/qa/qa-oqc-check/services/qa-oqc.service';
import { RelayDateCodeService } from 'src/app/admin/relay/relay-datecode/relay-datecode.service';
import { PackingOqcRequestService } from '../services/packing-oqc-request.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-packing-oqc-request-list',
  templateUrl: './packing-oqc-request-list.component.html',
  styleUrls: ['./packing-oqc-request-list.component.scss'],
})
export class PackingOqcRequestListComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  materialTbl!: DxDataGridComponent;

  totalQtyMaterialScanned: number = 0;
  materialScanned: any[] = [];
  isOpenModal: boolean = false;
  isOpenDetailModal: boolean = false;

  constructor(
    private reDateCodeSvc: RelayDateCodeService,
    private qaOqcSvc: QaOqcService,
    private packingOqcRequestSvc: PackingOqcRequestService,
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  searchParams = {
    requestStatusList: [],
    requestDateRange: [
      new Date().setDate(new Date().getDate() - 7),
      new Date(),
    ],
  };

  oqcRequests: any;
  qaCards: any;
  errorCreateRequestMsg: string | null = null;

  qaCardInfo = {
    model: null,
    line: null,
    date: null,
    shift: null,
    value: null,
  };

  priority: any = 2;
  sortingQty: number = 0;
  totalQty: number = 0;
  isSorting: string = 'NO';
  remark: any;

  // Version 2
  requestCreate: any = {
    qaCard: null,
    dateCodes: null,
    totalQty: 0,
    deliveryDate: null,
    isSorting: false,
    sortingQty: 0,
    priority: 2,
    remark: null,
  };

  requestUpdate: any;

  ngOnInit(): void {
    this.getOqcRequests(this.searchParams);
  }

  getOqcRequests(searchVo: any) {
    this.qaOqcSvc.getOqcRequests(searchVo).subscribe((response) => {
      this.oqcRequests = response;
      console.log('Request list: ', this.oqcRequests);
    });
  }

  handleCancel() {
    this.isOpenModal = false;
    this.qaCardInfo.date = null;
    this.qaCardInfo.line = null;
    this.qaCardInfo.model = null;
    this.qaCardInfo.shift = null;
    this.qaCardInfo.value = null;
    this.errorCreateRequestMsg = null;
    this.priority = 2;
  }

  createOqcRequest() {

    // Kiểm tra trường hợp chưa nhập DateCode
    if (!this.requestCreate.totalQty) {
      this.toastr.warning('Chưa nhập Date Code', 'Warning');
      return;
    }


    // Kiểm tra nếu chưa scan NVL
    for (let i = 0; i < this.materialScanned.length; i++) {
      const element = this.materialScanned[i];
      if (!element.scanQty || element.scanQty <= 0) {
        this.toastr.warning(`Chưa scan đủ NVL trong line`, 'Warning');
        break;
      }
    }

    // Kiểm tra tỷ lệ scan NVL
    if((this.requestCreate.totalQty / this.totalQtyMaterialScanned * 100) > 20) {
      this.toastr.warning(`Không thể tạo request vì Qty Date Code so với Qty Scan trong line > 20%`, 'Warning');
      return
    }


    // Trường hợp sorting thì cần nhập số lượng
    if (this.requestCreate.isSorting) {
      if (this.requestCreate.sortingQty <= 0) {
        this.toastr.warning('Cần nhập Qty sau sorting', 'Warning');
        return;
      }
      if (this.requestCreate.sortingQty > this.requestCreate.totalQty) {
        this.toastr.warning(
          `Qty không được vượt quá ${this.requestCreate.totalQty}`,
          'Warning'
        );
        return;
      }
    }

    (this.requestCreate.createdBy = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username),

    console.log('DATA PUSH: ', this.requestCreate);

    this.packingOqcRequestSvc
      .createOqcRequest(this.requestCreate)
      .subscribe((response) => {
        console.log(response);

        if (response.status == 'ERROR') {
          this.errorCreateRequestMsg = response.messages;

          return;
        }

        // TODO
        this.getOqcRequests(this.searchParams);
        this.handleCancel();
        this.requestCreate.sortingQty = 0;
        this.requestCreate.remark = null;
        this.requestCreate.isSorting = 'NO';
        this.toastr.success('Thành công', 'Success');
      });
  }

  openModal() {
    this.getQaCards();
    this.materialScanned = [];
    this.totalQtyMaterialScanned = 0;
    this.requestCreate.qaCard = null;
    this.requestCreate.dateCodes = null;
    this.requestCreate.totalQty = 0;
    this.requestCreate.deliveryDate = null;
    this.requestCreate.isSorting = false;
    this.requestCreate.sortingQty = 0;
    this.requestCreate.priority = 2;
    this.requestCreate.remark = null;
    this.isOpenModal = true;
  }

  selectQaCard(event: any) {
    this.requestCreate.qaCard = event;
    this.requestCreate.qaCardSplit = event.split('*');
    // this.getDateCodes(event);
    // this.getMaterialScanned(event);

    // Bắt đầu loading nếu cần
    this.materialTbl?.instance.beginCustomLoading(`Đang load dữ liệu ...`);

    // Gọi 2 API song song
    forkJoin({
      dateCodes: this.reDateCodeSvc.getDateCodes(event),
      materials: this.reDateCodeSvc.getMaterialScanned(event),
    }).subscribe({
      next: ({
        dateCodes,
        materials,
      }: {
        dateCodes: any[];
        materials: any[];
      }) => {
        // Gán dữ liệu cho biến
        this.requestCreate.dateCodes = dateCodes;
        this.materialScanned = materials;

        // Tính tổng số lượng Qty (DateCode)
        let totalQty = 0;
        dateCodes.forEach((element: any) => {
          totalQty += element.qty;
        });
        this.requestCreate.totalQty = totalQty;

        // Tính tổng số lượng Qty (Material)
        let totalMaterialQty = 0;
        materials.forEach((element: any) => {
          totalMaterialQty += element.scanQty;
        });
        this.totalQtyMaterialScanned = totalMaterialQty;

        // Kết thúc loading
        this.materialTbl?.instance.endCustomLoading();

        console.log('✅ Cập nhật thành công:', {
          dateCodes,
          materials,
          totalQty,
        });
      },
      error: (err: unknown) => {
        console.error('❌ Lỗi khi gọi API:', err);
        this.materialTbl?.instance.endCustomLoading();
      },
    });
  }

  getDateCodes(qaCard: string | null) {
    this.reDateCodeSvc.getDateCodes(qaCard).subscribe((response) => {
      this.requestCreate.dateCodes = response;

      console.log('dateCodes: ', this.requestCreate.dateCodes);

      let totalQty = 0;

      this.requestCreate.dateCodes.forEach((element: any) => {
        totalQty += element.qty;
      });

      this.requestCreate.totalQty = totalQty;
    });
  }

  getQaCards() {
    this.reDateCodeSvc.getQACards().subscribe((response) => {
      this.qaCards = response;
    });
  }

  onRowPrepared(event: any) {
    if (event.rowType === 'data') {
      if (event.key.judgment === 'NG') {
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

  changeMode(event: any) {
    console.log(event);

    // this.requestCreate.isSorting = event == 'YES' ? true : false;
  }

  onExportClient(event: any) {}

  openDetailModal(item: any) {
    console.log('Item: ', item.data);

    this.requestUpdate = { ...item.data };

    this.isOpenDetailModal = true;
  }

  closeDetailModal() {
    this.isOpenDetailModal = false;
  }

  updateOqcRequest() {
    console.log('Item Update: ', this.requestUpdate);

    if (this.requestUpdate.sortingQty > this.requestUpdate.qty) {
      this.toastr.warning(
        `SL sau Sorting không được vượt quá ${this.requestUpdate.qty}`,
        'Warning'
      );
      return;
    }

    // TODO

    this.packingOqcRequestSvc
      .updateOqcRequest(this.requestUpdate)
      .subscribe((response) => {
        console.log('OqcRequestUpdate: ', response);

        this.toastr.success('Update thành công !', 'Success');
        this.getOqcRequests(this.searchParams);
        this.isOpenDetailModal = false;
      });
  }

  onSearch() {
    console.log('searchParams: ', this.searchParams);

    this.qaOqcSvc.getOqcRequests(this.searchParams).subscribe((response) => {
      this.oqcRequests = response;
    });
  }

  getMaterialScanned(qaCard: string) {
    this.materialScanned = [];
    this.materialTbl?.instance.beginCustomLoading(`Đang load dữ liệu ...`);
    this.reDateCodeSvc.getMaterialScanned(qaCard).subscribe((response) => {
      this.materialScanned = response;
      this.materialTbl?.instance.endCustomLoading();
    });
  }
}
