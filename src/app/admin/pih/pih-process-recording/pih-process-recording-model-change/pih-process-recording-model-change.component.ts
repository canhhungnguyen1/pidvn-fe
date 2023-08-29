import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ScannerVo } from '../models/ScannerVo';
import { PihProcessRecordingService } from '../services/pih-process-recording.service';

@Component({
  selector: 'app-pih-process-recording-model-change',
  templateUrl: './pih-process-recording-model-change.component.html',
  styleUrls: ['./pih-process-recording-model-change.component.scss'],
})
export class PihProcessRecordingModelChangeComponent implements OnInit {
  @ViewChild('userIpt') userIpt!: ElementRef;
  @ViewChild('labelIpt') labelIpt!: ElementRef;
  @ViewChild('coilIpt') coilIpt!: ElementRef;

  isVisible = false;
  isLoading: boolean = false;
  scanner: ScannerVo = new ScannerVo();
  isError: boolean = false;
  errMsg!: string;

  mapLotsScanned: Map<string, any> = new Map();
  lots: Array<any> = new Array();

  materials: any;
  psMasters: any;

  constructor(
    private pihPRSvc: PihProcessRecordingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

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

    this.isError = false;
    this.errMsg = '';

    let result = event.target.value.split(';')[3];
    let cpn = result.split('*');
    this.scanner.label = `${cpn[0]}*${cpn[1]}*${cpn[2]}*${cpn[3]}`;
    this.scanner.qty = parseInt(result[2]);

    let searchParams = {
      cpn: this.scanner.label,
    };

    this.parentModel = cpn[1];

    this.getMaterials(searchParams);
  }

  parentModel: any;

  scanCoil(event: any) {

    let lotNo = "";
    
    // Trường hợp là tem electriksola
    if(!event.target.value.includes(';')) {
      lotNo = event.target.value.substring(1)
    } else {
      lotNo = event.target.value.split(';')[3]
    }

    


    if (this.lots.length >= 24) {
      this.toastr.warning('Đã đủ số lượng', 'Warning');
      return;
    }

    this.pihPRSvc
      .checkSetupSaiNVL(this.parentModel, lotNo)
      .subscribe((response) => {
        console.log('response: ', response);

        if(response.result === 'OK') {
          this.mapLotsScanned.set(lotNo,lotNo);
      
          this.lots = Array.from(this.mapLotsScanned.values()).reverse();
      
          this.coilIpt.nativeElement.select();
      
          console.log('aaa', this.lots);
          return;
        }

        if(response.result === 'NG') {
          this.toastr.error('Sai nguyên vật liệu', 'ERROR');
          return;
        }

      });

    
  }

  getMaterials(searchVo: any) {
    this.pihPRSvc.getMaterials(searchVo).subscribe((response) => {
      this.materials = response;
    });
  }

  showModal(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.coilIpt.nativeElement.focus();
    }, 400);
  }

  handleOk(): void {
    if (this.lots.length < 24) {
      this.toastr.warning('Chưa đủ 24 cuộn COIL', 'Warning');
      return;
    }

    this.isLoading = true;

    let changeModelParams = {
      userId: this.scanner.userId,
      label: this.scanner.label,
      lots: this.lots.reverse(),
      qty: this.scanner.qty,
    };

    let searchVo = {
      cpn: changeModelParams.label,
    };

    this.pihPRSvc.changeModel(changeModelParams).subscribe((response) => {
      this.isVisible = false;
      this.isLoading = false;
      this.mapLotsScanned = new Map();
      this.lots = new Array();
      this.scanner = new ScannerVo();

      this.getMaterials(searchVo);
    });
  }

  handleCancel(): void {
    this.mapLotsScanned = new Map();
    this.lots = new Array();
    this.isVisible = false;
  }
}
