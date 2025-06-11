import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { PihStopLineInputService } from '../services/pih-stop-line-input.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import saveAs from 'file-saver';

@Component({
  selector: 'app-psli-input',
  templateUrl: './psli-input.component.html',
  styleUrl: './psli-input.component.scss',
})
export class PsliInputComponent implements OnInit, AfterViewInit {
  @ViewChild(DxDataGridComponent, { static: false })
  stopTimesGrid!: DxDataGridComponent;

  constructor(
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private pihStopLineSvc: PihStopLineInputService,
    private cdr: ChangeDetectorRef
  ) {}

  jwt!: any;

  userArea: any;

  isOpenInputModal: boolean = false;
  isLoading: boolean = false;

  lines: any[] = []; // Danh sách các Line
  models: any[] = []; // Danh sách các Model
  shifts: any[] = []; // Danh sách ca làm việc
  stopItems: any[] = []; // Danh sách các Item dừng máy
  stopTimes: any[] = []; // Danh sách dừng máy
  itemSelected: any = {}; // Lưu thông tin item khi chọn

  stopTimeSelected: any = {}; 

  searchVo: any = {
    dateRange: [
      new Date(new Date().setDate(new Date().getDate() - 7)),
      new Date(),
    ],
  };

  ngOnInit(): void {
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
  }

  ngAfterViewInit() {
    this.getUserArea();
    this.getStopTimes();
    this.cdr.detectChanges();
  }

  /**
   * Kiểm tra user đang ở khu vực nào
   * Lấy các master data cần thiết để hiển thị
   * Danh sach các Line, Model, Item dừng máy, Ca làm việc
   */
  getUserArea() {
    this.pihStopLineSvc.getUserArea(this.jwt.Username).subscribe((response) => {
      this.userArea = response.result;
      this.getStopItems(this.userArea.productTypeId);
      this.getLines(this.userArea.productTypeId);
      this.getModels(this.userArea.productTypeId);
      this.getShifts();
      console.log('getUserArea: ', response);
    });
  }

  /**
   * Lấy danh sách các Line theo khu vực (productTypeId)
   *
   * @param productTypeId khu vực
   */
  getLines(productTypeId: number) {
    this.pihStopLineSvc.getLines(productTypeId).subscribe((response) => {
      this.lines = response.result;
      console.log('getLines: ', this.lines);
    });
  }

  getShifts() {
    this.pihStopLineSvc.getShifts().subscribe((response) => {
      this.shifts = response.result;
      console.log('getShifts: ', this.shifts);
    });
  }

  /**
   * Lấy danh sách các Model theo productTypeId
   *
   * @param productTypeId
   */
  getModels(productTypeId: number) {
    this.pihStopLineSvc.getModels(productTypeId).subscribe((response) => {
      this.models = response.result;
      console.log('getModels: ', this.models);
    });
  }

  getStopItems(productTypeId: number) {
    this.pihStopLineSvc.getStopItems(productTypeId).subscribe((response) => {
      this.stopItems = response.result;
      console.log('getStopItems: ', this.stopItems);
    });
  }

  getStopTimes() {
    this.stopTimesGrid?.instance.beginCustomLoading(
      `Đang tải dữ liệu, vui lòng đợi...`
    );
    this.isLoading = true;

    this.pihStopLineSvc.getStopTimes(this.searchVo).subscribe(
      (response) => {
        // this.stopTimes = response.result;

        this.stopTimes = response.result.map((item: any) => ({
          ...item,
          dateStart: item.startTime,
        }));

        console.log('getStopTimes: ', this.stopTimes);
        this.stopTimesGrid?.instance.endCustomLoading();
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Lỗi khi tải dữ liệu', 'Error');
        console.error('Error fetching stop times:', error);
        this.stopTimesGrid?.instance.endCustomLoading();
        this.isLoading = false;
      }
    );
  }

  openInputModal() {
    if (!this.userArea) {
      this.toastr.warning(
        'User chưa được phân vào khu vực nhập dừng máy',
        'Warning'
      );
      return;
    }
    this.isOpenInputModal = true;
  }

  /**
   * Khi chọn Item
   * @param event
   */
  onChangeStopItem(event: any) {
    console.log('onChangeStopItem: ', event);

    this.itemSelected = this.stopItems.find((item) => item.id === event);
  }

  onExportStopTimes(event: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('StopTimes');
    exportDataGrid({
      component: event.component,
      worksheet: worksheet,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'StopTimes.xlsx'
        );
      });
    });
  }

  // Style header
  onCellPrepared(e: any) {
    if (e.rowType === 'header') {
      e.cellElement.style.backgroundColor = '#000080'; // Change background color
      e.cellElement.style.color = '#ffffff'; // Change text color for better visibility
      e.cellElement.style.fontWeight = 'bold';
    }
  }
}
