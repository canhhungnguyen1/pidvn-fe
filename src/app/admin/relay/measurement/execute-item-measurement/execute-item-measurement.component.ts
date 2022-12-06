import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasurementService } from '../services/measurement.service';
import { LINES } from '../lines';
import { MODEL_TYPES } from '../model-types';
import { SHIFTS } from '../shift';
import { MOLDS } from '../mold';
import { SearchParams } from '../models/SearchParams';

@Component({
  selector: 'app-execute-item-measurement',
  templateUrl: './execute-item-measurement.component.html',
  styleUrls: ['./execute-item-measurement.component.scss'],
})
export class ExecuteItemMeasurementComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private measureService: MeasurementService
  ) {}

  isShowLoading: boolean = false;
  isShowSearch: boolean = false;
  isShowNormalForm: boolean = false;
  isShowCheckSheetForm: boolean = false;

  item: any;
  itemName!: string;
  itemImages!: any[];
  standard: any;

  qaCards: any;
  lines = LINES;
  molds = MOLDS;
  modelTypes!: any[];
  models!: any[];
  users!: any[];
  shifts = SHIFTS;
  reasons!: any[];

  modelTypeSelected: any;

  searchParams: SearchParams = new SearchParams();

  
  isCheckMold!: boolean;

  ngOnInit(): void {
    this.itemName = this.activatedRoute.snapshot.queryParams['itemName'];
    let listItemCheckMold = [2,17,18,19,16,22,26,27];
    this.isCheckMold = !listItemCheckMold.includes(Number(this.activatedRoute.snapshot.queryParams['item']));

    this.getQaCard();
    this.getUsers();
    this.getReasons();
    this.getModel();
    this.handleSelectBox();
  }

  getQaCard() {
    this.measureService.getQaCard().subscribe(
      response => {
        this.qaCards =response;
      }
    )
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
   * Chọn QA Card
   * @param $event
   */
  onChangeQaCard($event: any) {

    this.isShowNormalForm = false;
    this.isShowCheckSheetForm = false;

    let qaCard = $event;
    let result = qaCard.split('*');
    this.searchParams.line = result[1];
    this.searchParams.model = result[0];
    // this.searchParams.shift = result[3];

    let lineType = result[1].replace(/\d+/g, '');
    this.modelTypes = MODEL_TYPES.filter((e) => e.type == lineType);
    this.searchParams.modelType = null;


    // Hiển thị dữ liệu cho khuôn
    let molds = [...MOLDS];
    this.molds = molds.filter((e) => e.line == result[1]);
  }

  /**
   * Chọn line sản xuất
   * @param $event
   */
  onChangeLine($event: any) {
    
  }

  /**
   * Chọn dòng sản phẩm
   * Lấy thông tin tiêu chuẩn hạng mục đo
   * @param $event
   */
  onChangeModelType($event: any) {
    this.searchParams.mold = null;
    let item = this.activatedRoute.snapshot.queryParams['item'];

    let form = this.activatedRoute.snapshot.queryParams['form'];

    if (form == 'CHECK_SHEET') {
      this.handleCheckSheetForm(item, $event);
    } else {
      this.handleNormalForm(item, $event);
    }
  }

  onChangeMold($event: any) {}

  onChangeModel($event: any) {
    if ($event == null) {
      sessionStorage.removeItem('mea_modelSelected');
      return;
    }
    sessionStorage.setItem('mea_modelSelected', $event);
  }

  onChangeUser($event: any) {
    if ($event == null) {
      sessionStorage.removeItem('mea_userSelected');
      return;
    }
    sessionStorage.setItem('mea_userSelected', $event);
  }

  onChangeShift($event: any) {
    if ($event == null) {
      sessionStorage.removeItem('mea_shiftSelected');
      return;
    }
    sessionStorage.setItem('mea_shiftSelected', $event);
  }

  onChangeReason($event: any) {
    if ($event == null) {
      sessionStorage.removeItem('mea_reasonSelected');
      return;
    }
    sessionStorage.setItem('mea_reasonSelected', $event);
  }

  handleCheckSheetForm(item: any, $event: any): void {

    this.modelTypeSelected = $event;

    this.isShowLoading = true;
    this.measureService.getItemById(item).subscribe((response) => {
      this.item = response;
      this.isShowLoading = false;
      this.isShowSearch = true;

      this.measureService.getStandard(item, $event).subscribe(
        response => {
          this.standard = response.standard;
          console.log('Standard: ' , this.standard)
          this.isShowCheckSheetForm = true;
        }
      )

      
    });

    this.measureService.getItemImagesV2(item, $event).subscribe((response) => {
      this.itemImages = response;
    });

    
  }

  handleNormalForm(item: any, $event: any): void {
    this.isShowLoading = true;
    this.measureService.getStandard(item, $event).subscribe((response) => {
      this.item = response.item;
      this.standard = response.standard;
      console.log('Standard: ', this.standard)

      this.measureService.getItemImagesV2(item, $event).subscribe((response) => {
        this.itemImages = response;
        this.isShowLoading = false;
        this.isShowSearch = true;
        this.isShowNormalForm = true;
      });
    });
  }

  // Handle get data select box from local storage

  handleSelectBox() {
    let modelSelected = sessionStorage.getItem('mea_modelSelected');
    let userSelected = sessionStorage.getItem('mea_userSelected');
    let shiftSelected = sessionStorage.getItem('mea_shiftSelected');
    let reasonSelected = sessionStorage.getItem('mea_reasonSelected');

    this.searchParams.model = modelSelected ? modelSelected : null;
    this.searchParams.user = userSelected ? userSelected : null;
    this.searchParams.shift = shiftSelected ? shiftSelected : null;
    this.searchParams.reason = reasonSelected ? parseInt(reasonSelected) : null;
  }
}
