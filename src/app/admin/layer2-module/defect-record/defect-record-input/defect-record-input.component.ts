import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-defect-record-input',
  templateUrl: './defect-record-input.component.html',
  styleUrls: ['./defect-record-input.component.scss'],
})
export class DefectRecordInputComponent implements OnInit, AfterViewInit {
  @ViewChild('infoIpt') infoIpt!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  infoScan = {
    qaCard: null,
    model: null,
    line: null,
    date: null,
    shift: null,
    user: null,
  };

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.infoIpt.nativeElement.focus();
      let qaCard = this.activatedRoute.snapshot.queryParams['qaCard'];

      let obj = {
        target: {
          value: qaCard,
        },
      };

      this.scanInfo(obj);
    }, 0);
  }

  scanInfo(event: any) {
    let data = event.target.value;

    let info = data.split('*');

    // Scan QA card
    if (info.length === 5) {
      if (data.includes(';')) {
        this.toastr.warning('Cần scan QA card và ID');
        this.infoIpt.nativeElement.select();
        return;
      }

      this.infoScan.qaCard = data;
      this.infoScan.model = info[0];
      this.infoScan.line = info[1];
      this.infoScan.date = info[2];
      this.infoScan.shift = info[3];
    }

    // Scan User
    if (data.length === 7) {
      this.infoScan.user = data;
    }

    this.infoIpt.nativeElement.select();
  }
}
