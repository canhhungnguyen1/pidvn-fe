import { Component, OnInit } from '@angular/core';
import { StkPaymentService } from './stk-payment.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-stk-payment',
  templateUrl: './stk-payment.component.html',
  styleUrls: ['./stk-payment.component.scss']
})
export class StkPaymentComponent implements OnInit  {

  constructor(
    private stkPaymentSvc: StkPaymentService,
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  stkPayments: any

  isOpenModal: any;

  modalTitle: any;

  isEditMode: boolean = false;


  stkPayment: any;

  ngOnInit(): void {
    this.getStkPayments();
  }

  

  getStkPayments() {
    this.stkPaymentSvc.getStkPayments().subscribe(
      response => {
        this.stkPayments = response.reverse()
      }
    )
  }

  openModal(item: any) {

    console.log('aaa: ', item);
    

    this.stkPayment = {
      id: item ? item.data.id : null,
      code: item ? item.data.code : null,
      type: item ? item.data.type : null,
      name: item ? item.data.name : null,
      branchName: item ? item.data.branchName : null,
      bank: item ? item.data.bank : null,
      stk: item ? item.data.stk : null,
      currency: item ? item.data.currency : null,
      benificiary: item ? item.data.benificiary : null,
    };
    
    
    this.isEditMode = item ? true : false;

    this.modalTitle = this.isEditMode ? 'Form chỉnh sửa' : 'Form tạo mới';

    this.isOpenModal = true;
    
  }

  onSave() {
    console.log('EditMode: ', this.isEditMode);

    if (this.isEditMode) {
      this.updateStkPayment({...this.stkPayment});
      return;
    }

    this.createStkPayment();
    return;
    
  }

  cancelSave() {
    this.isOpenModal = false;
  }

  createStkPayment() {
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let obj = {
      code: this.stkPayment.code,
      type: this.stkPayment.type,
      name: this.stkPayment.name,
      branchName: this.stkPayment.branchName,
      bank: this.stkPayment.bank,
      stk: this.stkPayment.stk,
      currency: this.stkPayment.currency,
    };

    this.stkPaymentSvc.createStkPayment(obj).subscribe(
      response => {
        this.toastr.success('Thêm thành công', 'Success');
        this.getStkPayments();
        this.isOpenModal = false;
      }
    )
  }

  updateStkPayment(item: any) {
    this.stkPaymentSvc.updateStkPayment(item).subscribe(
      response => {
        this.toastr.success('Thêm thành công', 'Success');
        this.getStkPayments();
        this.isOpenModal = false;
      }
    )
  }



}
