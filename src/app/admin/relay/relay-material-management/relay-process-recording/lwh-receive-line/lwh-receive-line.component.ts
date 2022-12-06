import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { RePrService } from '../services/re-pr.service';

@Component({
  selector: 'app-lwh-receive-line',
  templateUrl: './lwh-receive-line.component.html',
  styleUrls: ['./lwh-receive-line.component.scss'],
})
export class LwhReceiveLineComponent implements OnInit {
  constructor(private toastr: ToastrService, private rePrSvc: RePrService) {}

  qaCard: string = 'ACTBPDR4*TB1*2022-04-27*N*001';
  lots: any;

  ngOnInit(): void {
    this.prepareDataV2();
  }

  prepareDataV2() {
    let lineWhRecords = this.rePrSvc.getPurWhRecords({
      qaCard: this.qaCard,
      recordType: 'RDC',
    });

    let lineRecords = this.rePrSvc.getPurWhRecords({
      qaCard: this.qaCard,
      recordType: 'CDL',
    });

    forkJoin([lineWhRecords, lineRecords]).subscribe((results) => {
      console.log('lineWhRecords', results[0]);
      console.log('lineRecords', results[1]);

      this.buildData(results[0], results[1]);
    });
  }

  buildData(lineWhRecords: any, lineInputRecords: any) {
    
    let results = new Array();

    for (const item of lineWhRecords) {
      results.push({
        model: item.model,
        lotNo: item.lotNo,
        qty: item.qty,
        qaCard: item.qaCard,
        lineInputRecords: new Array()
      })
    }

    for (const record of results) {
      for (const item of lineInputRecords) {
        if (record.lotNo === item.lotNo) {
          record.lineInputRecords.push(item);
        }
      }
    }

    results.sort(
      (a,b) => {
        if (a.model === b.model) {
          return b.lotNo - a.lotNo;
        }
        return a.model > b.model ? 1 : -1
      }
    );
    
    this.lots = results;
  }

  deleteHistory(item: any) {
    console.log('DATA', item);
  }
}
