import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { MeasurementService } from '../../../services/measurement.service';
@Component({
  selector: 'app-mea-exe-type2',
  templateUrl: './mea-exe-type2.component.html',
  styleUrls: ['./mea-exe-type2.component.scss'],
})
export class MeaExeType2Component implements OnInit {
  @Input() item!: any;
  @Input() images!: any;
  @Input() standard!: any;
  @Input() searchParams!: any;

  @ViewChild('value1Input') value1Input!: ElementRef;
  @ViewChild('value2Input') value2Input!: ElementRef;

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

  value1: any;
  value2: any;
  note: any;

  detailsData!: any[];

  ngOnInit(): void {
    this.valueNames = this.standard.valueName.split(';');
    this.getDetailData(this.searchParams);
  }

  onKeyPressValue1($event: any) {
    if ($event.keyCode == 13) {
      if (this.item.id !== 22 && (this.value1 == null || this.value1 == undefined)) {
        this.toastr.warning(`Cần nhập giá trị ${this.valueNames[0]} !`);
        return;
      }

      this.value2Input.nativeElement.focus();
    }
  }

  onKeyPressValue2($event: any) {
    if ($event.keyCode == 13) {
      if (this.item.id !== 22 && (this.value2 == null || this.value2 == undefined)) {
        this.toastr.warning(`Cần nhập giá trị ${this.valueNames[1]} !`);
        return;
      }

      this.onAddBtn();
    }
  }

  onAddBtn() {
    console.log('AAAAAAAAAA => ', this.searchParams)
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
    if (this.value1 == null || this.value2 == null) {
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
      b1: this.value1,
      b2: this.value2,
      mold: this.searchParams.modelType == 'TE' ? this.searchParams.mold : null,
      note: null,
      qaCard: this.searchParams.qaCard
    };

    this.insertData.push(obj);
    this.insertData = [...this.insertData];

    this.value1 = null;
    this.value2 = null;

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
        this.resetData();
        this.toastr.success('Saved !');
        this.getDetailData(this.searchParams)
      });
  }

  resetData() {
    this.insertData = new Array();
    this.value1 = null;
    this.value2 = null;
    this.isLoading = false;
    this.isShowModal = true;
    this.note = null;
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
