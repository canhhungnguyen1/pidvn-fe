import { Component, OnInit } from '@angular/core';
import { ReMatAdmService } from '../services/re-mat-adm.service';

@Component({
  selector: 'app-relay-material-traceability',
  templateUrl: './relay-material-traceability.component.html',
  styleUrls: ['./relay-material-traceability.component.scss'],
})
export class RelayMaterialTraceabilityComponent implements OnInit {
  lines: any;
  records: any;
  qaCards: any;

  searchVo: any = {};
  date: Date[] = [new Date(), new Date()];

  employee: any;

  recordSelected: any;

  constructor(private reMatAdmSvc: ReMatAdmService) {}

  ngOnInit(): void {
    this.searchVo.recordType = 'RDC';
    this.getLines(5);
    this.getQaCards();
  }

  getQaCards() {
    this.reMatAdmSvc.getQaCards().subscribe((response) => {
      this.qaCards = response;
    });
  }

  getLines(productId: number) {
    this.reMatAdmSvc.getLines(productId).subscribe((response) => {
      this.lines = response;
      console.log('Lines: ', this.lines);
    });
  }

  onSearch() {
    if (
      this.searchVo.recordType == 'RDC' ||
      this.searchVo.recordType == 'RNP'
    ) {
      this.employee = 'username';
    } else {
      this.employee = 'sender';
    }

    this.reMatAdmSvc
      .materialTraceability(this.searchVo)
      .subscribe((response) => {
        this.records = response;
        console.log('DATAS: ', this.records);
      });
  }

  onExport() {
    this.reMatAdmSvc.exportData(this.searchVo).subscribe((response) => {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = `Data.xlsx`;
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  onExportClient(event: any) {}

  onChangeTime(event: Date[]) {
    this.searchVo.fromDate = event[0];
    this.searchVo.toDate = event[1];
  }

  editQty(data: any) {
    this.recordSelected = { ...data };
    console.log('EDIT: ', data);
    // if (data.recordType == 'CDL') {
    //   this.reMatAdmSvc.editQtyImportedToLine(this.recordSelected).subscribe(
    //     response => {
    //       this.onSearch();
    //     }
    //   );
    // }
  }
}
