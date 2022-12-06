import { Component, OnInit } from '@angular/core';
import { TrainingRecordService } from '../services/training-record.service';

@Component({
  selector: 'app-training-record-history',
  templateUrl: './training-record-history.component.html',
  styleUrls: ['./training-record-history.component.scss'],
})
export class TrainingRecordHistoryComponent implements OnInit {
  constructor(private trainingRecordSvc: TrainingRecordService) {}

  histories: any;

  ngOnInit(): void {
    this.getHistories();
  }

  getHistories() {
    this.trainingRecordSvc.getHistories().subscribe((response) => {
      this.histories = response
      console.log(this.histories);
      
    });
  }
}
