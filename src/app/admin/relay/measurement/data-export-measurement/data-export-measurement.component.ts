import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LINES } from '../lines';
import { MODEL_TYPES } from '../model-types';
import { SearchParams } from '../models/SearchParams';
import { MeasurementService } from '../services/measurement.service';
import { SHIFTS } from '../shift';

@Component({
  selector: 'app-data-export-measurement',
  templateUrl: './data-export-measurement.component.html',
  styleUrls: ['./data-export-measurement.component.scss'],
})
export class DataExportMeasurementComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private measureService: MeasurementService
  ) {}

  item: any;
  itemName!: string;

  lines = LINES;
  modelTypes!: any[];
  models!: any[];
  users!: any[];
  shifts = SHIFTS;
  reasons!: any[];
  searchParams: SearchParams = new SearchParams();

  detailsData!: any[];

  date = null;

  standard: any;

  ngOnInit(): void {
    this.itemName = this.activatedRoute.snapshot.queryParams['itemName'];
    let item = this.activatedRoute.snapshot.queryParams['item'];
   
    this.searchParams.item = item
    this.getUsers();
    this.getModel();
    this.getReasons();
    this.getItemById(item);

    this.onSearchBtn();

  }

  getUsers() {
    this.measureService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  getModel() {
    this.measureService.getModels().subscribe((response) => {
      this.models = response;
    });
  }

  getReasons() {
    this.measureService.getReasons().subscribe((response) => {
      this.reasons = response;
    });
  }

  /**
   * Chọn line sản xuất
   * @param $event
   */
  onChangeLine($event: any) {
    let lineType = $event.replace(/\d+/g, '');
    this.modelTypes = MODEL_TYPES.filter((e) => e.type == lineType);
    this.searchParams.modelType = null;
    this.standard = null
  }

  /**
   * Chọn dòng sản phẩm
   * Lấy thông tin tiêu chuẩn hạng mục đo
   * @param $event
   */
   onChangeModelType($event: any) {
    let item = this.activatedRoute.snapshot.queryParams['item'];

    this.measureService.getStandard(item, $event).subscribe((response) => {
      this.standard = response.standard;
    });
  }

  onSearchBtn() {
    this.getDetailData(this.searchParams);
  }

  getDetailData(searchParams: SearchParams) {
    this.measureService.getDetailData(searchParams).subscribe((response) => {
      this.detailsData = response;
      console.log('AAA; ', this.detailsData)
    });
  }

  getItemById(id: any) {
    this.measureService.getItemById(id).subscribe((response) => {
      this.item = response;
    });
  }

  // Handle date picker
  onCalendarChange(result: Array<Date | null>): void {
    this.searchParams.fromDate = result[0];
    this.searchParams.toDate = result[1];
  }

  onDateChange(result: any): void {
    this.searchParams.fromDate = result[0];
    this.searchParams.toDate = result[1];
  }
}
