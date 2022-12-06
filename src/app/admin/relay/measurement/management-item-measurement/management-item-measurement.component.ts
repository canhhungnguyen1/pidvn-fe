import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LINES } from '../lines';
import { MODEL_TYPES } from '../model-types';
import { SearchParams } from '../models/SearchParams';
import { MeasurementService } from '../services/measurement.service';
import { SHIFTS } from '../shift';

@Component({
  selector: 'app-management-item-measurement',
  templateUrl: './management-item-measurement.component.html',
  styleUrls: ['./management-item-measurement.component.scss'],
})
export class ManagementItemMeasurementComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private measureService: MeasurementService,
    private msg: NzMessageService,
    private toastr: ToastrService,
    private jwtHelperService: JwtHelperService
  ) { }

  baseUrl = environment.baseUrl;

  isShowSearch: boolean = false;
  isShowLoading: boolean = false;
  isShowTab: boolean = false;

  item: any;
  form: any;
  itemName!: string;
  itemImages!: any[];
  standard: any;

  lines = LINES;
  modelTypes!: any[];
  models!: any[];
  users!: any[];
  shifts = SHIFTS;
  reasons!: any[];

  searchParams: SearchParams = new SearchParams();

  mastersData!: any[];

  date = null;

  isShowDetailModal: boolean = false;
  isShowUploadImageModal: boolean = false;
  uploadImageURL!: string;

  masterData: any;

  ngOnInit(): void {
    this.itemName = this.activatedRoute.snapshot.queryParams['itemName'];
    this.form = this.activatedRoute.snapshot.queryParams['form'];
    this.getUsers();
    this.getReasons();
    this.getModel();
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
    this.isShowSearch = false;
    this.isShowTab = false;
    let lineType = $event.replace(/\d+/g, '');
    this.modelTypes = MODEL_TYPES.filter((e) => e.type == lineType);
    this.item = null;
    this.searchParams.modelType = '';
  }

  /**
   * Chọn dòng sản phẩm
   * Lấy thông tin tiêu chuẩn hạng mục đo
   * @param $event
   */
  onChangeModelType($event: any) {
    let item = this.activatedRoute.snapshot.queryParams['item'];
    this.searchParams.item = item;
    this.searchParams.modelType = $event;

    if (this.form == 'CHECK_SHEET') {
      this.handleCheckSheetForm(item, $event);
    } else {
      this.handleNormalForm(item, $event);
    }
  }

  handleCheckSheetForm(item: any, $event: any) {
    this.isShowLoading = true;
    this.getMasterData(this.searchParams);
    this.measureService.getItemImagesV2(item, $event).subscribe((response) => {
      this.itemImages = response;
      this.isShowTab = true;
      this.isShowLoading = false;
      console.log('ItemImages: ', this.itemImages);
    });
  }

  handleNormalForm(item: any, $event: any): void {
    this.isShowLoading = true;

    this.measureService.getItemImagesV2(item, $event).subscribe((response) => {
      this.itemImages = response;
    });

    this.measureService.getStandard(item, $event).subscribe((response) => {
      this.item = response.item;
      this.standard = response.standard;
      console.log('AAAAA: ', this.standard)
      this.isShowLoading = false;
      this.isShowSearch = true;
      this.isShowTab = true;
    });

    this.getMasterData(this.searchParams);

  }

  getMasterData(searchParams: SearchParams) {
    this.measureService.getMasterData(searchParams).subscribe((response) => {
      this.mastersData = response;
    });
  }

  onSearch() {
    console.log('searchParams: ', this.searchParams);
    this.getMasterData(this.searchParams);
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

  onClickRowMaster(data: any) {
    console.log('Master row: ', data);
    this.masterData = data;
    console.log('Item : ', this.item)
    console.log('Form : ', this.form)
    this.isShowDetailModal = true;
  }

  handleApproveEmit() {
    this.getMasterData(this.searchParams);
  }

  openUploadImageModal() {
    this.isShowUploadImageModal = true;
    this.uploadImageURL = `${this.baseUrl}/Relay/Measurement/UploadImage?item=${this.item.id}&modelType=${this.searchParams.modelType}`;
  }

  closeUploadImageModal() {
    this.measureService.getItemImagesV2(this.item.id, this.searchParams.modelType).subscribe((response) => {
      this.itemImages = response;
      this.isShowUploadImageModal = false
    });
  }

  removeImage(image: any) {
    console.log(image);
    this.measureService.removeImage(image.id).subscribe(
      response => {
        this.measureService.getItemImagesV2(this.item.id, this.searchParams.modelType).subscribe((response) => {
          this.itemImages = response;
        });
      }
    )
  }

  beforeUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('Bạn chỉ có thể upload ảnh');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng);
      observer.complete();
    });



    quickApprove() {
      
      if (!this.searchParams.fromDate || !this.searchParams.fromDate) {
        this.toastr.warning("Cần chọn khoảng thời gian !");
        return;
      }

      let approver = this.jwtHelperService.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).Username;

      console.log('Datas: ', this.mastersData);
      console.log('Approver: ', approver);

      this.measureService.quickApprove(this.mastersData, approver).subscribe(
        response => {
          this.toastr.success("OK","Approved !");
          this.onSearch();
        }
      )
    }
}
