import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ScannerVo } from '../models/ScannerVo';
import { PihProcessRecordingService } from '../services/pih-process-recording.service';

@Component({
  selector: 'app-pih-process-recording-label-change',
  templateUrl: './pih-process-recording-label-change.component.html',
  styleUrls: ['./pih-process-recording-label-change.component.scss'],
})
export class PihProcessRecordingLabelChangeComponent implements OnInit {
  @ViewChild('userIpt') userIpt!: ElementRef;
  @ViewChild('newLabelIpt') newLabelIpt!: ElementRef;
  @ViewChild('oldLabelIpt') oldLabelIpt!: ElementRef;

  constructor(
    private pihPRSvc: PihProcessRecordingService,
    private toastr: ToastrService
  ) {}

  scanner: ScannerVo = new ScannerVo();
  isError: boolean = false;
  errMsg!: string;

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
    this.newLabelIpt.nativeElement.focus();
    this.newLabelIpt.nativeElement.select();
  }

  scanNewLabel(event: any) {
    let label = event.target.value.split(';')[3];
    this.scanner.newLabel = label;
    this.oldLabelIpt.nativeElement.focus();
    this.oldLabelIpt.nativeElement.select();
  }

  scanOldLabel(event: any) {
    let label = event.target.value.split(';')[3];
    this.scanner.oldLabel = label;

    if (this.scanner.newLabel == this.scanner.oldLabel) {
      // this.toastr.warning('Tem mới và tem cũ không được trùng nhau', 'Warning');
      this.oldLabelIpt.nativeElement.select();
      return;
    }
  }

  changeLabel() {
    if (
      !this.scanner.userId ||
      !this.scanner.newLabel ||
      !this.scanner.oldLabel
    ) {
      this.toastr.warning('Warning', 'Cần scan đủ thông tin');
      return;
    }

    this.pihPRSvc.changeLabel(this.scanner).subscribe((response) => {
      this.scanner = new ScannerVo();
      this.toastr.success('OK', 'Thành công');
    });
  }
}
