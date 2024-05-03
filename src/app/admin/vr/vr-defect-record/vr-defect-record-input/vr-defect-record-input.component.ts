import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VrDefectRecordService } from '../services/vr-defect-record.service';
import { DefectRecord } from '../models/defect-record';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-vr-defect-record-input',
  templateUrl: './vr-defect-record-input.component.html',
  styleUrls: ['./vr-defect-record-input.component.scss'],
})
export class VrDefectRecordInputComponent implements OnInit, AfterViewInit {
  @ViewChild('infoIpt') infoIpt!: ElementRef;

  @ViewChild(DxDataGridComponent, { static: false })
  defectGrid!: DxDataGridComponent;

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private vrDefectRecordSvc: VrDefectRecordService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  infoScan = {
    qaCard: null,
    model: null,
    line: null,
    date: null,
    shift: null,
    user: null,
  };

  processes: any;

  selectedProcess: any;

  defectRecords: any;

  ngOnInit(): void {
    this.getProcess();
  }

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

  getProcess() {
    let qaCard = this.activatedRoute.snapshot.queryParams['qaCard'];
    let line = qaCard.split('*')[1];
    this.vrDefectRecordSvc.getProcessByLine(line).subscribe((response) => {
      this.processes = response;
    });
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

  /**
   * Sự kiện ấn nút Save
   * @param event 
   */
  async onSaveHandler(event: any) {
    let lotNo = this.activatedRoute.snapshot.queryParams['qaCard'];
    let info = lotNo.split('*');

    let dataChange = new Array();

    await event.changes.forEach((item: any) => {
      dataChange.push(item.key);
    });

    let dataSave = new Array();
    dataChange.forEach((item) => {
      let obj = new DefectRecord();
      obj.id = item.id;
      obj.model = item.id ? item.model : info[0];
      obj.line = item.id ? item.line : info[1];
      obj.date = item.id ? new Date(item.date) : new Date(info[2]);
      obj.shift = item.id ? item.shift : info[3];
      obj.lotNo = item.id ? item.lotNo : lotNo;
      obj.defectCode = item.defectCode;
      obj.qty = item.qty;
      obj.remark = item.remark;
      obj.status = item.status;
      obj.userId = this.jwtHelperSvc.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).UserId;

      dataSave.push(obj);
    });

    this.defectGrid?.instance.beginCustomLoading(`Saving ...`);

    this.vrDefectRecordSvc.saveDefectRecords(dataSave).subscribe(
      (response) => {
        this.defectGrid.instance.endCustomLoading();

        this.vrDefectRecordSvc
          .getDefectRecords(this.selectedProcess, lotNo)
          .subscribe((response) => {
            this.defectRecords = response;
            this.toastr.success('Success !', 'Lưu thành công');
          });

        console.log('Save response: ', response);
      },
      (error) => {
        this.defectGrid.instance.endCustomLoading();
        console.log('Save error: ', error);
        this.toastr.error('Error !', 'Có lỗi');
      }
    );
  }

  /**
   * Chọn công đoạn
   */
  onChangeProcess(event: any) {
    console.log(event);

    if (!this.infoScan.user) {
      this.toastr.warning('Cần nhập mã nhân viên !', 'Warning');
      return;
    }

    this.infoIpt.nativeElement.select();

    let lotNo = this.activatedRoute.snapshot.queryParams['qaCard'];

    this.vrDefectRecordSvc
      .getDefectRecords(this.selectedProcess, lotNo)
      .subscribe((response) => {
        this.defectRecords = response;
      });

    // alert(`Thực hiện call Api lấy danh sách lỗi theo công đoạn: \n ${this.selectedProcess}`)
  }
}
