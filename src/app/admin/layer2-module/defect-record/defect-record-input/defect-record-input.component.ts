import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
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

  dataSource = [
    {
      item: 'Bạc và nhíp biến dạng / sứt mẻ',
      value: 10,
    },
    {
      item: 'Gắn nhíp hằn/ biến dạng',
      value: '',
    },
    {
      item: 'Gắn lệch nhíp',
      value: '',
    },
    {
      item: 'Rơi vãi',
      value: '',
    },
    {
      item: 'IE sửa máy',
      value: '',
    },
    {
      item: 'Đổi lô',
      value: '',
    },
    {
      item: 'QA đo',
      value: '',
    },
    {
      item: 'Các lỗi khác (nếu có)',
      value: '',
    }
  ];

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


  onSaveHandler(event: any) {
    console.log(event);
    let arr = new Array();

    event.changes.forEach((item: any) => {
      arr.push(item.key);
    });
    console.log('Arr: ', arr);
  }

  selectedValue: any;
  options = [
    { label: 'Detent spring fixing', value: 1 },
    { label: 'Friction plate insert', value: 2 },
    { label: 'Marking', value: 3 },
    { label: 'Brush forming', value: 4 },
    { label: 'Brush fixing', value: 5 },
    { label: 'Carrier Grease', value: 6 },
    { label: 'Shaft greasing', value: 7 },
    { label: 'Cam cap inserting', value: 8 }
  ];

  /**
   * Chọn công đoạn
   */
  onChangeProcess(event: any) {
    console.log("Change: ", event , this.selectedValue);
    this.infoIpt.nativeElement.select();

    if (!this.infoScan.user) {
      this.toastr.warning('Cần nhập mã nhân viên !','Warning')
      return;
    }
    
    alert(`Thực hiện call Api lấy danh sách lỗi theo công đoạn: \n ${this.selectedValue}`)


  }


}
