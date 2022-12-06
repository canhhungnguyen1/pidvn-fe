import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { SearchParams } from '../../../models/SearchParams';
import { MeasurementService } from '../../../services/measurement.service';

@Component({
  selector: 'app-mea-exe-check-sheet',
  templateUrl: './mea-exe-check-sheet.component.html',
  styleUrls: ['./mea-exe-check-sheet.component.scss'],
})
export class MeaExeCheckSheetComponent implements OnInit {
  @Input() item!: any;
  @Input() modelType!: any;
  @Input() images!: any;
  @Input() standard!: any;
  @Input() searchParams!: any;

  constructor(
    private toastr: ToastrService,
    private measureService: MeasurementService
  ) {}

  baseUrl = environment.baseUrl;
  childItems!: any[];
  qty: any;
  isSaveLoading: boolean = false;
  isChildItemTableLoading: boolean = false;
  isShowModal: boolean = false;
  responseData: any[] = new Array();
  valueNames!: any[];

  mastersData: any;
  note: any;

  ngOnInit(): void {
    this.valueNames = this.standard.valueName.split(';');
    this.getMasterData(this.searchParams);
    this.getChildItems(this.item.id, this.modelType);

    console.log('HIHIHI: ', this.item)
    console.log('standard: ', this.standard)
  }

  getMasterData(searchParams: SearchParams) {
    this.searchParams.item = this.item.id;
    this.measureService.getMasterData(searchParams).subscribe((response) => {
      this.mastersData = response;
      console.log('Master: ', this.mastersData)
    });
  }

  getChildItems(item:number, modelType: string) {
    this.isChildItemTableLoading = true;
    this.measureService.getChildItems(item, modelType).subscribe((response) => {
      this.childItems = response;
      this.isChildItemTableLoading = false;
    });
  }

  onSaveBtn() {
    if (
      !this.searchParams.modelType ||
      !this.searchParams.model ||
      !this.searchParams.user ||
      !this.searchParams.shift ||
      !this.searchParams.reason
    ) {
      this.toastr.warning('Cần nhập các thông tin bắt buộc');
      return;
    }

    // if (!this.qty) {
    //   this.toastr.warning('Cần nhập số lượng rút mẫu');
    //   return;
    // }

    let detailList = new Array<any>();
    this.childItems.forEach((e) => {
      let mcsDetail = {
        line: this.searchParams.line,
        modelType: this.searchParams.modelType,
        item: this.item.id,
        model: this.searchParams.model,
        user: this.searchParams.user,
        shift: this.searchParams.shift,
        reason: this.searchParams.reason,
        a1: e.value,
        childItem: e.id,
        qty: this.standard.measureAmount,
        note: !this.note ? null : this.note,
        qaCard: this.searchParams.qaCard
      };

      detailList.push(mcsDetail);
    });

    // for (let i = 0; i < detailList.length; i++) {
    //   if (!detailList[i].a1) {
    //     this.toastr.warning('Cần đánh giá tất cả các hạng mục');
    //     return;
    //   }
    // }

    this.isSaveLoading = true;

    this.measureService.saveMeasureData(detailList).subscribe((response) => {
      this.isSaveLoading = false;
      this.responseData = response;
      this.isShowModal = true;
      detailList = new Array();
      this.toastr.success('Saved !');
      this.qty = null;
      this.note = null;
      this.getChildItems(this.item.id, this.modelType);
      this.getMasterData(this.searchParams);
    });
  }


  showDetailData(data: any) {

    this.searchParams.master = data.id;

    this.measureService.getDetailData(this.searchParams).subscribe(
      response => {
        this.responseData = response;
        this.isShowModal = true
        console.log(this.responseData)
      }
    )
    
  }
}
