import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzImageService } from 'ng-zorro-antd/image';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { TrainingRecordService } from '../services/training-record.service';

@Component({
  selector: 'app-training-record-detail',
  templateUrl: './training-record-detail.component.html',
  styleUrls: ['./training-record-detail.component.scss'],
})
export class TrainingRecordDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private trainingRecordSvc: TrainingRecordService,
    private jwtHelperService: JwtHelperService,
    private toastr: ToastrService,
    private nzImageService: NzImageService
  ) {}

  baseUrl = environment.baseUrl;
  usersUploadApi: any;

  users: any;

  testResult: any = [
    { id: 'PASS', value: 'PASS' },
    { id: 'FAIL', value: 'FAIL' },
  ];

  options: any = [
    { id: 'YES', value: 'YES' },
    { id: 'NO', value: 'NO' },
  ];

  trainingRecordMaster: any;
  trainingRecordDetail: any;

  attendanceUsers = new Array();

  isOpenAddUserModal: boolean = false;
  isOpenAttendanceModal: boolean = false;

  ngOnInit(): void {
    this.getUsers();
    this.getTrainingRecordMaster();
    this.getTrainingRecordDetail();
  }

  getTrainingRecordMaster() {
    let searchVo = {
      id: Number(this.activatedRoute.snapshot.paramMap.get('id')),
    };

    this.trainingRecordSvc
      .getTrainingRecordMaster(searchVo)
      .subscribe((response) => {
        this.trainingRecordMaster = response[0];
        console.log('trainingRecordMaster: ', this.trainingRecordMaster);
      });
  }

  getTrainingRecordDetail() {
    let trainingRecordMaster = this.activatedRoute.snapshot.paramMap.get('id');
    let searchVo = {
      trainingRecordMaster: trainingRecordMaster,
    };

    this.trainingRecordSvc
      .getTrainingRecordDetail(searchVo)
      .subscribe((response) => {
        this.trainingRecordDetail = response;
      });
  }

  getUsers() {
    this.trainingRecordSvc.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  onSaved(event: any) {
    let master = this.activatedRoute.snapshot.paramMap.get('id');
    let obj = event.changes[0].key;
    let type = event.changes[0].type;
    this.trainingRecordSvc
      .saveTrainingRecordDetail(obj, Number(master), type, this.trainingRecordMaster.scoreOfPass)
      .subscribe((response) => {
        this.getTrainingRecordDetail();
      });
  }

  onSelectionChanged(
    selectedRowKeys: any,
    cellInfo: any,
    dropDownBoxComponent: any
  ) {
    cellInfo.setValue(selectedRowKeys[0]);
    if (selectedRowKeys.length > 0) {
      dropDownBoxComponent.close();
    }
  }

  gridBox_displayExpr(item: any) {
    return item && `${item.username} <${item.name}>`;
  }

  onFocusedCellChanging(e: any) {
    e.isHighlighted = true;
  }

  onApprove() {
    let masterId = this.trainingRecordMaster.id;
    let approver = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.trainingRecordSvc
      .approveTrainingRecord(masterId, approver)
      .subscribe((response) => {
        this.toastr.success('Approved !', 'OK');
        this.getTrainingRecordMaster();
      });
  }

  openAddUserModal() {
    this.isOpenAddUserModal = true;
    let masterId = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersUploadApi = `${this.baseUrl}/Relay/TrainingRecord/UploadUsers?master=${masterId}`;
  }

  uploadUsers() {
    this.getTrainingRecordDetail();
    this.isOpenAddUserModal = false;
  }

  listAttendance: any;

  attendanceUser(event: any) {
    let masterId = this.activatedRoute.snapshot.paramMap.get('id');
    let searchVo = {
      trainingRecordMaster: masterId,
      username: event.target.value,
    };

    this.trainingRecordSvc.attendanceUser(searchVo).subscribe((response) => {
      this.attendanceUsers.push(response);
      this.attendanceUsers = [...this.attendanceUsers];
      event.target.value = null;
    });
  }

  onOpenAttendanceModal() {
    this.isOpenAttendanceModal = true;
    this.attendanceUsers = [];
  }

  onCloseAttendanceModal() {
    this.isOpenAttendanceModal = false;
    this.getTrainingRecordDetail();
  }

  onExporting(e: any) {
    
  }

  openGuideline() {
    const images = [
      {
        src: `${this.baseUrl}/images/relay/training-record/Guideline.png`,
        alt: 'ng-zorro'
      }
    ];
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }
}
