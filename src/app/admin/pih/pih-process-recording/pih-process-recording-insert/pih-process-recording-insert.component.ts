import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BOBBINS } from '../models/bobbins';
import { ScannerVo } from '../models/ScannerVo';
import { PihProcessRecordingService } from '../services/pih-process-recording.service';

@Component({
  selector: 'app-pih-process-recording-insert',
  templateUrl: './pih-process-recording-insert.component.html',
  styleUrls: ['./pih-process-recording-insert.component.scss'],
})
export class PihProcessRecordingInsertComponent implements OnInit {
  @ViewChild('userIpt') userIpt!: ElementRef;
  @ViewChild('userIpt2') userIpt2!: ElementRef;
  @ViewChild('labelIpt') labelIpt!: ElementRef;
  @ViewChild('labelIpt2') labelIpt2!: ElementRef;

  @ViewChild('newCoilIpt') newCoilIpt!: ElementRef;
  @ViewChild('newCoilIpt2') newCoilIpt2!: ElementRef;
  @ViewChild('oldCoilIpt') oldCoilIpt!: ElementRef;

  constructor(
    private pihPRSvc: PihProcessRecordingService,
    private toastr: ToastrService
  ) {}

  psMasters: any;
  scanner: ScannerVo = new ScannerVo();
  scanner2: ScannerVo = new ScannerVo();

  materials: any;
  label!: string;
  label2!: string;

  isError: boolean = false;
  isError2: boolean = false;
  errMsg!: string;
  isLoading: boolean = false;

  isOpenManualModal: boolean = false;
  isOpenEditModal: boolean = false;

  positions = [
    { value: 1, label: 'Vị trí 1' },
    { value: 2, label: 'Vị trí 2' },
    { value: 3, label: 'Vị trí 3' },
    { value: 4, label: 'Vị trí 4' },
    { value: 5, label: 'Vị trí 5' },
    { value: 6, label: 'Vị trí 6' },
    { value: 7, label: 'Vị trí 7' },
    { value: 8, label: 'Vị trí 8' },
    { value: 9, label: 'Vị trí 9' },
    { value: 10, label: 'Vị trí 10' },
    { value: 11, label: 'Vị trí 11' },
    { value: 12, label: 'Vị trí 12' },
    { value: 13, label: 'Vị trí 13' },
    { value: 14, label: 'Vị trí 14' },
    { value: 15, label: 'Vị trí 15' },
    { value: 16, label: 'Vị trí 16' },
    { value: 17, label: 'Vị trí 17' },
    { value: 18, label: 'Vị trí 18' },
    { value: 19, label: 'Vị trí 19' },
    { value: 20, label: 'Vị trí 20' },
    { value: 21, label: 'Vị trí 21' },
    { value: 22, label: 'Vị trí 22' },
    { value: 23, label: 'Vị trí 23' },
    { value: 24, label: 'Vị trí 24' },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.userIpt.nativeElement.focus();
    }, 0);
  }

  scanUser(event: any) {
    let result = event.target.value;

    if (!/^[0-9]{7}$/.test(result)) {
      this.isError = true;
      this.errMsg = 'Bạn cần scan User ID';
      this.userIpt.nativeElement.focus();
      this.userIpt.nativeElement.select();
      return;
    }

    this.scanner.userId = result;
    this.labelIpt.nativeElement.focus();
    this.labelIpt.nativeElement.select();
    this.isError = false;
    this.errMsg = '';
  }

  scanLabel(event: any) {
    if (
      !event.target.value.includes(';') ||
      !event.target.value.includes('*')
    ) {
      this.isError = true;
      this.errMsg = 'Bạn cần scan tem NVL';
      this.labelIpt.nativeElement.focus();
      this.labelIpt.nativeElement.select();
      return;
    }

    let result = event.target.value.split(';');

    this.scanner.qty = Number(result[2]);
    this.scanner.label = result[3];

    let plotno = result[3].split('*');
    this.label = `${plotno[0]}*${plotno[1]}*${plotno[2]}*${plotno[3]}`;
    this.scanner.sequence = parseInt(plotno[4]);

    let searchVo = {
      plotno: this.label,
      recordType: 'PIC',
    };
    this.pihPRSvc.getMaterials(searchVo).subscribe((response) => {
      this.materials = response;
    });

    this.newCoilIpt.nativeElement.focus();
    this.newCoilIpt.nativeElement.select();
    this.isError = false;
    this.errMsg = '';
  }

  scanNewCoil(event: any) {

    let lotNo = "";
    // Trường hợp là tem electriksola
    if (!event.target.value.includes(';')) {
      lotNo = event.target.value.substring(1);
    } else {
      lotNo = event.target.value.split(';')[3]
    }
    


    // Check nếu là Lot cũ thì báo lỗi
    let params = {
      clotno: lotNo,
      cpn: this.label,
    };

    this.pihPRSvc.scanCoil(params).subscribe((response: any) => {
      console.log(response);
      if (response.status == 'ERROR') {
        debugger;
        this.isError = true;
        this.errMsg = response.message;
        this.newCoilIpt.nativeElement.select();
        this.scanner.newCoil = '';
        return;
      }

      this.scanner.newCoil = lotNo;
      this.oldCoilIpt.nativeElement.focus();
      this.oldCoilIpt.nativeElement.select();
      this.isError = false;
      this.errMsg = '';
    });
  }

  scanOldCoil(event: any) {

    let lotNo = "";
    // Trường hợp là tem electriksola
    if (!event.target.value.includes(';')) {
      lotNo = event.target.value.substring(1);
    } else {
      lotNo = event.target.value.split(';')[3]
    }

    if (lotNo == this.scanner.newCoil) {
      this.oldCoilIpt.nativeElement.select();
      this.isError = true;
      this.errMsg = 'Bạn cần scan Lot đã dùng hết';
      return;
    }

    this.scanner.oldCoil = lotNo;
    this.isError = false;
    this.errMsg = '';
  }

  onSave() {
    if (
      !this.scanner.userId ||
      !this.scanner.label ||
      !this.scanner.newCoil ||
      !this.scanner.oldCoil
    ) {
      this.toastr.warning('Cần nhập đủ thông tin', 'Warning');
      return;
    }

    this.isLoading = true;

    let obj = { ...this.scanner };
    // obj.newCoil = obj.newCoil;
    // obj.oldCoil = obj.oldCoil;

    this.pihPRSvc.insertCoil(obj).subscribe((response) => {
      let searchVo = {
        cpn: this.label,
      };
      this.pihPRSvc.getMaterials(searchVo).subscribe((response) => {
        this.isLoading = false;
        this.materials = response;
        this.scanner = new ScannerVo();
        this.toastr.success('Thành công', 'Success');
      });
    });
  }

  scanUserIpt2(event: any) {
    let result = event.target.value;

    if (!/^[0-9]{7}$/.test(result)) {
      this.isError2 = true;
      this.errMsg = 'Bạn cần scan User ID';
      this.userIpt2.nativeElement.focus();
      this.userIpt2.nativeElement.select();
      return;
    }

    this.scanner2.userId = result;
    this.labelIpt2.nativeElement.focus();
    this.labelIpt2.nativeElement.select();
    this.isError2 = false;
    this.errMsg = '';
  }

  scanLabelIpt2(event: any) {
    if (
      !event.target.value.includes(';') ||
      !event.target.value.includes('*')
    ) {
      this.isError2 = true;
      this.errMsg = 'Bạn cần scan tem NVL';
      this.labelIpt2.nativeElement.focus();
      this.labelIpt2.nativeElement.select();
      return;
    }

    let result = event.target.value.split(';');

    this.scanner2.qty = Number(result[2]);
    this.scanner2.label = result[3];

    let cpn = result[3].split('*');
    this.label2 = `${cpn[0]}*${cpn[1]}*${cpn[2]}*${cpn[3]}`;
    this.scanner2.sequence = parseInt(cpn[4]);

    this.newCoilIpt2.nativeElement.focus();
    this.newCoilIpt2.nativeElement.select();
    this.isError = false;
    this.errMsg = '';
  }

  openManualModal() {
    // this.scanner2 = new ScannerVo();
    // this.isOpenManualModal = true;
    alert('Không dùng chức năng này !')
  }

  onSave2() {
    if (
      !this.scanner2.userId ||
      !this.scanner2.label ||
      !this.scanner2.newCoil ||
      !this.scanner2.position
    ) {
      this.toastr.warning('Cần nhập đủ thông tin', 'Warning');
      return;
    }

    let obj = { ...this.scanner2 };
    obj.newCoil = obj.newCoil.substring(1);

    this.pihPRSvc.insertCoilManual(obj).subscribe((response) => {
      let searchVo = {
        cpn: this.label2,
      };
      this.pihPRSvc.getMaterials(searchVo).subscribe((response) => {
        this.materials = response;
        this.isOpenManualModal = false;
        this.toastr.success('Thành công', 'Success');
      });
    });
  }
}
