import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LINES } from '../../lines';
import { MeasurementXbarService } from '../../services/measurement-xbar.service';
import { MeasurementService } from '../../services/measurement.service';
import { SearchParams } from '../models/SearchParams';

@Component({
  selector: 'app-xbar-chart-mea-detail',
  templateUrl: './xbar-chart-mea-detail.component.html',
  styleUrls: ['./xbar-chart-mea-detail.component.scss'],
})
export class XbarChartMeaDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private measureService: MeasurementService,
    private xbarSvc: MeasurementXbarService
  ) {}

  // Search condition
  lines = LINES;
  searchParams: SearchParams = new SearchParams();

  //
  item: any;
  itemType: any;
  itemName: any;

  xbarData: any;

  ngOnInit(): void {
    this.item = this.activatedRoute.snapshot.queryParams['item'];
    this.itemType = this.activatedRoute.snapshot.queryParams['itemType'];
    this.itemName = this.activatedRoute.snapshot.queryParams['itemName'];
  }

  onSearch() {
    this.searchParams.item = Number(this.item);
    this.searchParams.itemType = Number(this.itemType);

    this.xbarSvc.getXbarData(this.searchParams).subscribe(
      response => {
        this.xbarData = response
        console.log('XBarData: ', response);
      }
    )
    
  }

  // Handle date picker
  onChange(result: any): void {
    this.searchParams.fromDate = result[0];
    this.searchParams.toDate = result[1];
  }

  onOk(result: any | Date[] | null): void {
    this.searchParams.fromDate = result[0];
    this.searchParams.toDate = result[1];
  }

  onCalendarChange(result: Array<Date | null>): void {
    this.searchParams.fromDate = result[0];
    this.searchParams.toDate = result[1];
  }


  onExporting(e: any) { }

  
}
