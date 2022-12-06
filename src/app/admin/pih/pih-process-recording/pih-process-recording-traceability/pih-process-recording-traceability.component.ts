import { Component, OnInit } from '@angular/core';
import { PihProcessRecordingService } from '../services/pih-process-recording.service';

@Component({
  selector: 'app-pih-process-recording-traceability',
  templateUrl: './pih-process-recording-traceability.component.html',
  styleUrls: ['./pih-process-recording-traceability.component.scss']
})
export class PihProcessRecordingTraceabilityComponent implements OnInit {

  constructor(private pihPRSvc: PihProcessRecordingService,) { }

  materials: any;
  lines: any;
  searchVo: any = {};
  date: Date[] = [new Date(), new Date()];

  ngOnInit(): void {
    this.getLines();
  }

  getLines() {
    this.pihPRSvc.getLines(4).subscribe(
      response => {
        this.lines = response
      }
    )
  }

  onChangeTime(event: Date[]) {
    this.searchVo.fromDate = event[0];
    this.searchVo.toDate = event[1];
  }

  onExportClient(event: any) {

  }

  onSearch() {
    let params = {...this.searchVo}
    params['recordType'] = 'PIC';
    
    this.pihPRSvc.getMaterials(params).subscribe(
      response => {
        this.materials = response
      }
    )
  }

}
