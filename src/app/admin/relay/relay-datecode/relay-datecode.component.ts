import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { RelayDateCodeService } from './relay-datecode.service';

@Component({
  selector: 'app-relay-datecode',
  templateUrl: './relay-datecode.component.html',
  styleUrls: ['./relay-datecode.component.scss'],
})
export class RelayDatecodeComponent implements OnInit, AfterViewInit {
  @ViewChild('infoIpt') infoIpt!: ElementRef;
  @ViewChild('dateCodeIpt') dateCodeIpt!: ElementRef;
  @ViewChild('qtyIpt') qtyIpt!: ElementRef;

  constructor(
    private reDateCodeSvc: RelayDateCodeService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService
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

  dateCodeSave = {
    qaCard: null,
    dateCode: null,
    qty: 0,
    userCode: 0,
    model: null,
    line: null,
    date: new Date(),
    shift: null
  };

  ngOnInit(): void {
    this.getAllDateCode();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.infoIpt.nativeElement.focus();
    }, 0);
  }

  dataSanXuat: any;

  getAllDateCode() {
    this.reDateCodeSvc.getAllDateCode().subscribe(
      response => {
        console.log(response);
        this.dataSanXuat = response;
      }
    )
  }

  scanInfo(event: any) {
    let data = event.target.value;
    this.qaCardInfo.value = data;
    let arr = data.split('*');

    if (arr.length !== 5 || !data.includes('*')) {
      this.toastr.warning('QA card không đúng định dạng','Warning');
      return
    }

    this.qaCardInfo.model = arr[0];
    this.qaCardInfo.line = arr[1];
    this.qaCardInfo.date = arr[2];
    this.qaCardInfo.shift = arr[3];

    this.infoIpt.nativeElement.select();

    this.getDateCodes(data);
  }

  getDateCodes(qaCard: string | null) {
    this.reDateCodeSvc.getDateCodes(qaCard).subscribe((response) => {
      this.dateCodes = response;
    });
  }

  onCancel() {
    this.isOpenModal = false;
  }

  onSave() {

    if (!this.dateCodeSave.dateCode || !this.dateCodeSave.dateCode) {
      this.toastr.warning('Cần nhập Date Code và Qty','Warning')
      return
    }

    const regex = /[0-9](0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z][0-9]/

    if (!regex.test(this.dateCodeSave.dateCode!)) {
      this.toastr.warning('Date Code không đúng định dạng','Warning')
      return
    }



    this.isLoading = true;
    this.dateCodeSave.userCode = Number(this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).UserId)
    this.dateCodeSave.qaCard = this.qaCardInfo.value;
    this.dateCodeSave.model = this.qaCardInfo.model;
    this.dateCodeSave.line = this.qaCardInfo.line;
    this.dateCodeSave.shift = this.qaCardInfo.shift;
    this.dateCodeSave.date = new Date(this.qaCardInfo.date);


    this.reDateCodeSvc.createDateCode(this.dateCodeSave).subscribe(
      response => {
        this.toastr.success('Thêm Date Code thành công','OK')
        this.resetModal();
        this.getDateCodes(this.qaCardInfo.value)
        this.isOpenModal = false;
        this.isLoading = false;
      },
      error => {
        this.resetModal();
        this.isLoading = false;
        this.isLoading = false;
      }
    )
  }

  resetModal() {
    this.dateCodeSave.dateCode = null;
    this.dateCodeSave.qty = 0;
  }

  deleteDatCode(data: any) {
    console.log('Xóa: ', data);
    this.reDateCodeSvc.deleteDateCode(data.id).subscribe(
      response => {
        this.toastr.success('Xóa thành công','OK');
        this.getDateCodes(this.qaCardInfo.value);
      }
    )
  }

  onChangeDateCode(event: any) {
    this.dateCodeSave.dateCode = event.toUpperCase();
  }

  onExportClient(event: any) {

  }

  addDateCode() {

    let arr = this.qaCard.split("*");

    if (arr.length !== 5 || !this.qaCard.includes('*')) {
      this.toastr.warning('QA card không đúng định dạng','Warning');
      return
    }


    this.isOpenModal = true
  }

  getQaCards() {
    this.reDateCodeSvc.getQACards().subscribe(
      response => {
        this.qaCards = response
      }
    )
  }
}
