import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { TrainingRecordService } from '../services/training-record.service';

@Component({
  selector: 'app-training-record-master',
  templateUrl: './training-record-master.component.html',
  styleUrls: ['./training-record-master.component.scss']
})
export class TrainingRecordMasterComponent implements OnInit {

  constructor(
    private i18n: NzI18nService,
    private router: Router,
    private trainingRecordSvc: TrainingRecordService
  ) {}

  isVisible: boolean = false;

  trainingRecordMaster: any = {};
  trainingRecordMasters: any = {};
  trainingRecordType: any;

  courses: any;
  users: any;
  
  ngOnInit(): void {
    this.i18n.setLocale(en_US);
    this.getCourses();
    this.getUsers();
    this.getTrainingRecordMaster();
    this.getTrainingRecordType();
  }

  

  createTrainingRecord() {
    this.trainingRecordSvc.createTrainingRecordMaster(this.trainingRecordMaster).subscribe(
      response => {
        this.getTrainingRecordMaster();
        this.isVisible = false;
        this.trainingRecordMaster = {};
      }
    )
  }

  getTrainingRecordType() {
    this.trainingRecordSvc.getTrainingRecordType().subscribe(
      response => {
        this.trainingRecordType = response;
      }
    )
  }

  getUsers() {
    this.trainingRecordSvc.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  getTrainingRecordMaster() {
    this.trainingRecordSvc.getTrainingRecordMaster({}).subscribe(
      response => {
        this.trainingRecordMasters = response
      }
    )
  }

  showGuideline() {
    this.trainingRecordSvc.showGuideline().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  getCourses() {
    this.trainingRecordSvc.getCourses().subscribe(
      response => {
        this.courses = response;
      }
    )
  }

  onSaved(event: any) {
    let master = event.changes[0].key;
    let action = event.changes[0].type;
    this.trainingRecordSvc.saveTrainingRecordMaster(master, action).subscribe((response) => {
      this.getTrainingRecordMaster();
    });
  }

  onRowClick(event: any) {
    this.router.navigate([`admin/relay/training-record/master/${event.data.id}`]);
  }
}
