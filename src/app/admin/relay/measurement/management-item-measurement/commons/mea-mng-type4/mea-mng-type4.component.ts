import { Component, Input, OnInit } from '@angular/core';
import { SearchParams } from '../../../models/SearchParams';
import { MeasurementService } from '../../../services/measurement.service';

@Component({
  selector: 'app-mea-mng-type4',
  templateUrl: './mea-mng-type4.component.html',
  styleUrls: ['./mea-mng-type4.component.scss']
})
export class MeaMngType4Component implements OnInit {

  @Input() item!: any;
  @Input() images!: any;
  @Input() standard!: any;
  @Input() searchParams!: any;

  constructor(private measureService: MeasurementService) { }

  detailsData!: any[];

  valueNames!: any[];

  date = null;

  ngOnInit(): void {
    this.valueNames = this.standard.valueName.split(';');
    this.getDetailData(this.searchParams);
  }

  getDetailData(searchParams: SearchParams) {
    this.measureService.getDetailData(searchParams).subscribe((response) => {
      this.detailsData = response;
    });
  }

  onSearch() {
    this.getDetailData(this.searchParams);
  }

  onCalendarChange(result: Array<Date | null>): void {
    this.searchParams.fromDate = result[0];
    this.searchParams.toDate = result[1];
  }
  
  onDateChange(result: any): void {
    this.searchParams.fromDate = result[0];
    this.searchParams.toDate = result[1];
  }

}
