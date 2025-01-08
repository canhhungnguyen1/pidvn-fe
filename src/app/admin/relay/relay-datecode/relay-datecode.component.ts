import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { RelayDateCodeService } from './relay-datecode.service';
import { ActivatedRoute } from '@angular/router';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-relay-datecode',
  templateUrl: './relay-datecode.component.html',
  styleUrls: ['./relay-datecode.component.scss'],
})
export class RelayDatecodeComponent implements OnInit, AfterViewInit {
  // @ViewChild('infoIpt') infoIpt!: ElementRef;
  @ViewChild('dateCodeIpt') dateCodeIpt!: ElementRef;
  @ViewChild('qtyIpt') qtyIpt!: ElementRef;

  constructor(
    private reDateCodeSvc: RelayDateCodeService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  dateCodes: any;
  qaCardInfo = {
    model: null,
    line: null,
    date: '',
    shift: null,
    value: null,
  };

  qaCards: any;

  qaCard: any;

  isOpenModal: boolean = false;
  isLoading: boolean = false;
  customerCodes: any;

  dateCodeSave = {
    qaCard: null,
    dateCode: null,
    qty: 0,
    userCode: 0,
    model: null,
    line: null,
    date: new Date(),
    shift: null,
    customerCode: null,
    recordType: null,
    remark: null
  };

  area: any;

  ngOnInit(): void {
    this.area = this.activatedRoute.snapshot.queryParams['area'];
    this.getAllDateCode();
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.infoIpt.nativeElement.focus();
    // }, 0);

    this.getQaCards();
  }

  dataSanXuat: any;

  getAllDateCode() {
    this.reDateCodeSvc.getAllDateCode().subscribe((response) => {
      console.log(response);
      this.dataSanXuat = response;
    });
  }

  test(event: any) {
    console.log('AAA : ', event);
  }

  /**
   * Scan QA card, lấy dữ liệu DateCode và Customer Code
   * @param event
   */
  scanInfo(event: any) {
    let data = event;
    this.qaCardInfo.value = data;
    let arr = data.split('*');

    // if (arr.length !== 5 || !data.includes('*')) {
    //   this.toastr.warning('QA card không đúng định dạng','Warning');
    //   return
    // }

    this.qaCardInfo.model = arr[0];
    this.qaCardInfo.line = arr[1];
    this.qaCardInfo.date = arr[2];
    this.qaCardInfo.shift = arr[3];

    //this.infoIpt.nativeElement.select();

    this.getDateCodes(data);
    this.getCustomerCodeByQACard(data);
  }

  getDateCodes(qaCard: string | null) {
    this.reDateCodeSvc.getDateCodes(qaCard).subscribe((response) => {
      this.dateCodes = response;
    });
  }

  getCustomerCodeByQACard(qaCard: string) {
    this.reDateCodeSvc.getQACardByValue(qaCard).subscribe((response) => {
      console.log('getQACardByValue: ', response);
      this.customerCodes = response.customerCode;
      if (!response.customerCode) {
        return;
      }
      this.customerCodes = response.customerCode.split(';');
    });
  }

  onCancel() {
    this.resetModal();
    this.isOpenModal = false;
  }

  onSave() {
  

    if (!this.dateCodeSave.dateCode || !this.dateCodeSave.qty) {
      this.toastr.warning('Cần nhập DateCode; Qty', 'Warning');
      return;
    }

    let condition = this.isValidInputDateCode(this.area);

    if (!condition.isValid) {
      this.toastr.warning(`${condition.msg}`, 'Warning');
      return;
    }

    this.isLoading = true;
    this.dateCodeSave.userCode = Number(
      this.jwtHelperSvc.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).UserId
    );
    this.dateCodeSave.qaCard = this.qaCardInfo.value;
    this.dateCodeSave.model = this.qaCardInfo.model;
    this.dateCodeSave.line = this.qaCardInfo.line;
    this.dateCodeSave.shift = this.qaCardInfo.shift;
    this.dateCodeSave.date = new Date(this.qaCardInfo.date);
    this.dateCodeSave.recordType = this.area


    this.reDateCodeSvc.createDateCode(this.dateCodeSave).subscribe(
      (response) => {
        this.toastr.success('Nhập Date Code thành công', 'OK');
        this.resetModal();
        this.getDateCodes(this.qaCardInfo.value);
        this.isOpenModal = false;
        this.isLoading = false;
      },
      (error) => {
        this.resetModal();
        this.isLoading = false;
      }
    );
  }

  private isValidInputDateCode(area: string) : any {

    debugger

    if (area === 'RELAY') {
      const regex = /[0-9](0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z][0-9]/;
      if (!regex.test(this.dateCodeSave.dateCode!)) {

        let result = {
          isValid: false,
          msg: 'Date Code không đúng định dạng'
        }
        return result;
      }
    }

    if (area === 'VR-ENC') {
      
    }






    let result = {
      isValid: true,
      msg: 'Date Code hợp lệ'
    }
    return result;
  }

  resetModal() {
    this.dateCodeSave.customerCode = null;
    this.dateCodeSave.dateCode = null;
    this.dateCodeSave.qty = 0;
    this.dateCodeSave.remark = null;
  }

  deleteDatCode(data: any) {
    console.log('Xóa: ', data);
    this.reDateCodeSvc.deleteDateCode(data.id).subscribe((response) => {
      this.toastr.success('Xóa thành công', 'OK');
      this.getDateCodes(this.qaCardInfo.value);
    });
  }

  onChangeDateCode(event: any) {
    this.dateCodeSave.dateCode = event.toUpperCase();
  }

  onExportClient(event: any) {
    const workbook = new Workbook();    
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
            component: event.component,
            worksheet: worksheet
        }).then(function() {
            workbook.xlsx.writeBuffer()
                .then(function(buffer: BlobPart) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'M4M8-History.xlsx');
                });
        });
  }

  addDateCode() {
    let arr = this.qaCard.split('*');

    // Kiểm tra định dạng QA card
    if (arr.length !== 5 || !this.qaCard.includes('*')) {
      this.toastr.warning('QA card không đúng định dạng', 'Warning');
      return;
    }

    // Kiểm tra QA card đã có customer code chưa
    // if (!this.customerCodes) {
    //   this.toastr.warning('QA card không có Customer Code','Warning');
    //   return
    // }

    this.isOpenModal = true;
  }

  getQaCards() {
    this.reDateCodeSvc.getQACards().subscribe((response) => {
      this.qaCards = response;
    });
  }
}
