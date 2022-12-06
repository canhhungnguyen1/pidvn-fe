import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MeasurementService } from '../../../services/measurement.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-mea-exe-type1',
  templateUrl: './mea-exe-type1.component.html',
  styleUrls: ['./mea-exe-type1.component.scss'],
})
export class MeaExeType1Component implements OnInit {
  @Input() item!: any;
  @Input() images!: any;
  @Input() standard!: any;
  @Input() searchParams!: any;

  @ViewChild('value1Input') value1Input!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private measureService: MeasurementService
  ) { }

  baseUrl = environment.baseUrl;
  isLoading: boolean = false;
  isShowModal: boolean = false;
  valueNames!: any[];

  insertData: any[] = new Array();
  responseData: any[] = new Array();

  detailsData!: any[];

  value1: any;
  note: any;

  ngOnInit(): void {
    this.valueNames = this.standard.valueName.split(';');
    this.getDetailData(this.searchParams);
    console.log('item: ', this.item);
    console.log('images: ', this.images);
    console.log('standard : ', this.standard);
    console.log('valueNames : ', this.valueNames);
    console.log('searchParams : ', this.searchParams);
  }

  ngAfterViewInit() {
    if (this.item.unit == 1) {
      this.value1Input.nativeElement.focus();
    }
  }

  onKeyPressValue1($event: any) {
    if ($event.keyCode == 13) {
      if (this.value1 == null || this.value1 == undefined) {
        this.toastr.warning(`Cần nhập: ${this.valueNames[0]} !`);
        return;
      }
      this.onAddBtn();
    }
  }

  onAddBtn() {

    let condition = !this.searchParams.model || !this.searchParams.user || !this.searchParams.shift || !this.searchParams.reason;

    let listItemCheckMold = [2,17,18,19,16,22,26,27];

    if (this.searchParams.modelType == 'TE') {
      if (condition || (!this.searchParams.mold && !listItemCheckMold.includes(this.item.id))) {
        this.toastr.warning('Cần nhập các thông tin bắt buộc');
        return;
      }
    } else {
      if (condition) {
        this.toastr.warning('Cần nhập các thông tin bắt buộc');
        return;
      }
    }

    // Kiểm tra số lượng đo
    if (this.insertData.length == this.standard.measureAmount) {
      this.toastr.warning(`Đã đủ số lượng đo: ${this.standard.measureAmount}`);
      return;
    }

    // Kiểm tra nếu data null
    if (this.value1 == null || this.value1 == undefined) {
      this.toastr.warning(`Cần nhập: ${this.valueNames}`);
      return;
    }

    let obj = {
      uuid: uuid(),
      line: this.searchParams.line,
      modelType: this.searchParams.modelType,
      item: this.item.id,
      model: this.searchParams.model,
      user: this.searchParams.user,
      shift: this.searchParams.shift,
      reason: this.searchParams.reason,
      a1: this.value1,
      mold: this.searchParams.modelType == 'TE' ? this.searchParams.mold : null,
      note: null,
      qaCard: this.searchParams.qaCard
    };

    this.insertData.push(obj);
    this.insertData = [...this.insertData];
    this.value1 = null;
    if (this.item.unit == 1) {
      this.value1Input.nativeElement.focus();
    }
  }

  onDeleteValue($event: any) {
    let removeIndex = this.insertData.findIndex((item) => {
      return item.uuid === $event.uuid;
    });

    if (removeIndex != -1) {
      this.insertData.splice(removeIndex, 1);
    }

    this.insertData = [...this.insertData];
  }

  onSaveBtn() {

    if (this.insertData.length < this.standard.measureAmount) {
      this.toastr.warning(`Cần đo đủ số lượng tiêu chuẩn : ${this.standard.measureAmount}`);
      return;
    }

    if (this.note) {
      this.insertData.forEach(item => {
        item.note = this.note;
      })
    }

    this.isLoading = true;
    this.measureService
      .saveMeasureData(this.insertData)
      .subscribe((response) => {
        this.responseData = response;
        this.insertData = new Array();
        this.note = null;
        this.isLoading = false;
        this.isShowModal = true;
        this.toastr.success('Saved !');
        this.getDetailData(this.searchParams)
      });
  }

  getDetailData(searchParams: any) {
    searchParams.item = this.item.id;
    this.measureService.getDetailData(searchParams).subscribe(
      response => {
        this.detailsData = response
      }
    )
  }
}
