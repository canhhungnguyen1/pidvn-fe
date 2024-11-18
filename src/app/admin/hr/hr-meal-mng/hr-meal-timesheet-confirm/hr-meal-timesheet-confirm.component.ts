import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HrMealMngService } from '../services/hr-meal-mng.service';
import { DxFileUploaderComponent } from 'devextreme-angular';

@Component({
  selector: 'app-hr-meal-timesheet-confirm',
  templateUrl: './hr-meal-timesheet-confirm.component.html',
  styleUrls: ['./hr-meal-timesheet-confirm.component.scss'],
})
export class HrMealTimesheetConfirmComponent implements OnInit {

  @ViewChild('fileUploader', { static: false }) fileUploader!: DxFileUploaderComponent;


  isLoadingTimeSheetConfirm: boolean = false;

  constructor(
    private hrMealMngSvc: HrMealMngService,
    private toastr: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}
  
  baseUrlJava = environment.baseUrlJava;
  baseUrl = environment.baseUrl;
  isOpenUploadFileModal: boolean = false

  fileUploadApi: any
  dataSendEmail: any

  couponsBalance: any
  date = null;

  isLoading: boolean[] = [false, false, false, false];

  items = [
    {
      label: 'Attendance',
      table: 'attendance',
      isLoading: false
    },
    {
      label: 'OT',
      table: 'overtime',
      isLoading: false
    },
    {
      label: 'MealRecord',
      table: 'meal_record',
      isLoading: false
    },
    {
      label: 'Leave Day',
      table: 'leave_day',
      isLoading: false
    }
  ]

  timesheetConfirm(index: number, item: any): void {
    this.items[index].isLoading = true;
    this.hrMealMngSvc.timesheetConfirm(item.table).subscribe(
      response => {
        console.log('DATA: ', response);
        this.items[index].isLoading = false;
      },
      error => {
        console.error('ERROR: ', error);
        this.items[index].isLoading = false;
      }
    )
  }





  ngOnInit(): void {
    this.fileUploadApi = `${this.baseUrl}/HR/Meal/GetUserSendEmail`
  }



  getCouponsBalance() {
    this.hrMealMngSvc.getBalance(this.date).subscribe(
      response => {
        this.couponsBalance = response
      }
    )
  }

  redirectAllowanceCouponPage() {
    let token2 = localStorage.getItem('token2');
    let allowanceCouponLink = `${this.baseUrlJava}/pidvn/admin?name=pidvn_hr_meal_list&accessToken=${token2}`
    window.open(allowanceCouponLink, '_blank');
  }

  redirectAddCouponSpecial() {
    let token2 = localStorage.getItem('token2');
    let addCouponSpecia = `${this.baseUrlJava}/pidvn/admin?name=List_sepcial_cupon&accessToken=${token2}`
    window.open(addCouponSpecia, '_blank');
  }


  openUploadFileModal() {
    this.isOpenUploadFileModal = true
  }
  

  uploadFile() {
    const selectedFile = this.fileUploader.value[0];

    this.hrMealMngSvc.uploadFile(selectedFile).subscribe(
      response => {
        this.dataSendEmail = response
        this.isOpenUploadFileModal = false
      }
    )
  }


  sendEmail() {
    if (!this.dataSendEmail) {
      this.toastr.warning('Không có dữ liệu','Warning')
      return
    }


    this.hrMealMngSvc.sendEmail(this.dataSendEmail.data).subscribe(
      response => {
        this.dataSendEmail = null
        this.toastr.success('','OK');
      }
    )


  }


}
