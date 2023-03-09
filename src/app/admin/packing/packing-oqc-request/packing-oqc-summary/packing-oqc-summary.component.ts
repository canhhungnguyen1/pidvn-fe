import { Component, OnInit } from '@angular/core';
import { PackingOqcRequestService } from '../services/packing-oqc-request.service';

@Component({
  selector: 'app-packing-oqc-summary',
  templateUrl: './packing-oqc-summary.component.html',
  styleUrls: ['./packing-oqc-summary.component.scss']
})
export class PackingOqcSummaryComponent implements OnInit {

  constructor(private packingOqcRequestSvc: PackingOqcRequestService) { }

  ngOnInit(): void {
    // this.getAllOqcRequestStatus();
  }

  date: Date[] = [new Date(), new Date()];
  oqcRequestStatuses: any;
  typeSearch: any;

  searchVo: any = {
    fromDate: new Date(),
    toDate: new Date(),
    type: 1
  };

  dataSummary: any;

  getAllOqcRequestStatus() {
    this.packingOqcRequestSvc.getOqcRequestStatus().subscribe(
      response => { 
        this.oqcRequestStatuses = response
      }
    )
  }

  panels = [
    {
      active: true,
      name: 'Search condition',
      disabled: false
    }
  ];

  onChangeTime(event: Date[]) {
    this.searchVo.fromDate = event[0];
    this.searchVo.toDate = event[1];
  }


  

  onSearch() {

    this.typeSearch = this.searchVo.type

    this.packingOqcRequestSvc.summaryData(this.searchVo).subscribe(
      response => {
        this.dataSummary = response;
      }
    )
    
  }

}
