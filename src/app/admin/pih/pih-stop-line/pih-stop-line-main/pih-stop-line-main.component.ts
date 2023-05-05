import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { PihStopLineService } from '../services/pih-stop-line.service';
import { debug } from 'console';

@Component({
  selector: 'app-pih-stop-line-main',
  templateUrl: './pih-stop-line-main.component.html',
  styleUrls: ['./pih-stop-line-main.component.scss'],
})
export class PihStopLineMainComponent implements OnInit {
  constructor(
    private pihStopLineSvc: PihStopLineService,
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  productTypes: any = [];
  productTypeSelected: any;

  //types: any = [];
  // groups = new Array();
  items: any = [];
  lines: any = [];
  linesByArea: any = []; // lấy line theo khu vực ()
  shifts: any = [];

  isOpenModal: boolean = false;
  modalTitle!: string;

  errorMsg: string | null = null;
  stopTypes = new Array();
  stopGroups = new Array();
  stopItems = new Array();

  stopTimes: any;

  stopTimeSelected: any = {
    id: null,
    date: new Date(),
    startTime: null,
    stopTime: null,
    type: null,
    group: null,
    item: null,
    line: null,
    shift: null,
    remark: null,
  };

  searchParams = {
    startTimeRange: null,
    createdAtRange: [new Date().setDate(new Date().getDate() - 14), new Date()],
  };

  onSearch() {
    console.log(this.searchParams);

    this.getStopTimes(this.searchParams);
  }

  ngOnInit(): void {
    
    this.getProductTypes(4);
    this.getLines();
    this.getShifts();
    this.getStopTypes();
    this.getStopGroups();
    this.getStopItems();
    this.getStopTimes({
      startTimeRange: null,
      createdAtRange: [
        new Date().setDate(new Date().getDate() - 14),
        new Date(),
      ],
    });
  }

  getProductTypes(productId: number) {
    this.pihStopLineSvc.getProductTypes(productId).subscribe((response) => {
      this.productTypes = response;
      console.log('productTypes: ', this.productTypes);
    });
  }

  getLines() {
    this.pihStopLineSvc.getLines().subscribe((response) => {
      this.lines = response;
      console.log('lines: ', this.lines);
    });
  }
  getShifts() {
    this.pihStopLineSvc.getShifts().subscribe((response) => {
      this.shifts = response;
    });
  }

  getStopTimes(searchParams: any) {
    this.pihStopLineSvc.getStopTimes(searchParams).subscribe((response) => {
      this.stopTimes = response;
      console.log('stopTimes: ', response);
      this.getProductTypeIdByUser();
    });
  }

  getStopTypes() {
    this.pihStopLineSvc.getStopTypes().subscribe((response) => {
      this.stopTypes = response;
      console.log('stopTypes: ', response);
    });
  }

  getStopGroups() {
    this.pihStopLineSvc.getStopGroups().subscribe((response) => {
      this.stopGroups = response;
    });
  }

  getStopItems() {
    this.pihStopLineSvc.getStopItems().subscribe((response) => {
      this.items = response;
    });
  }

  openModal(type: string, data: any) {

    // Kiểm tra user thuộc khu vực nào
    if (!this.productTypeSelected) {
      this.toastr.warning('User chưa được set khu vực nhập dừng máy','Warning')
      return
    }

    this.linesByArea = new Array();
    for (const item of this.lines) {
      if (item.productTypeId == this.productTypeSelected) {
        this.linesByArea.push(item);
      }
    }

    if (type == 'insert') {
      this.modalTitle = 'Thêm dữ liệu dừng Line';
      this.stopTimeSelected.id = null;
      //this.stopTimeSelected.item = null
      //this.stopTimeSelected.date = null
      this.stopTimeSelected.startTime = null;
      this.stopTimeSelected.stopTime = null;
      //this.stopTimeSelected.line = null
      //this.stopTimeSelected.shift = null
    }

    if (type == 'update') {
      this.modalTitle = 'Sửa dữ liệu dừng Line';
      this.stopTimeSelected.type = data.typeId;

      this.stopGroups = new Array();
      for (const group of this.stopGroups) {
        if (group.stopTypeId == data.typeId) {
          this.stopGroups.push(group);
        }
      }

      this.stopTimeSelected.group = data.groupId;
      for (const item of this.items) {
        if (item.stopGroupId == data.groupId) {
          this.stopItems.push(item);
        }
      }

      this.stopTimeSelected.id = data.id;
      this.stopTimeSelected.item = data.itemId;
      this.stopTimeSelected.date = data.date;
      this.stopTimeSelected.startTime = data.startTime;
      this.stopTimeSelected.stopTime = data.stopTime;
      this.stopTimeSelected.line = data.lineId;
      this.stopTimeSelected.shift = data.shiftId;
      this.stopTimeSelected.remark = data.remark;
    }

    this.isOpenModal = true;
  }

  onChangeProductTypes($event: any) {
    console.log('onChangeProductTypes: ', $event);

    this.stopItems = new Array();

    this.productTypeSelected = $event;

    for (const item of this.items) {
      
      if (!item.productTypes) {
        continue;
      }

      let productTypes = item.productTypes?.split(',');

      if (productTypes.includes(this.productTypeSelected.toString())) {
        this.stopItems.push(item);
      }
    }

    console.log('listStopItems: ', this.stopItems);
  }

  onChangeStopTypes($event: any) {
    // console.log('onChangeStopTypes: ', $event);
    // this.stopGroups = new Array();
    // for (const group of this.groups) {
    //   if (group.stopTypeId == $event) {
    //     this.stopGroups.push(group);
    //   }
    // }
    // console.log('listStopGroup: ', this.stopGroups);
  }

  onChangeStopGroups($event: any) {
    // console.log('onChangeStopGroups: ', $event);
    // this.stopItems = new Array();
    // for (const item of this.items) {
    //   if (!item.productTypes) {
    //     continue;
    //   }
    //   let productTypes = item.productTypes?.split(',');
    //   if (item.stopGroupId == $event && productTypes.includes(this.productTypeSelected.toString())) {
    //     this.stopItems.push(item);
    //   }
    // }
    // console.log('listStopItems: ', this.stopItems);
  }

  onChangeStopItems($event: any) {
    console.log($event);

    let stopItem = this.stopItems.find((item) => {
      return item.id == $event;
    });

    console.log(stopItem);

    this.stopTimeSelected.group = stopItem.stopGroupId;

    let stopGroup = this.stopGroups.find((item) => {
      return item.id == stopItem.stopGroupId;
    });

    this.stopTimeSelected.type = stopGroup.stopTypeId;
  }

  onSave() {
    console.log('stopTimeSelected ', this.stopTimeSelected);

    let obj = {
      id: this.stopTimeSelected.id,
      stopItemId: this.stopTimeSelected.item,
      line: this.stopTimeSelected.line,
      startTime: this.stopTimeSelected.startTime,
      stopTime: this.stopTimeSelected.stopTime,
      date: this.stopTimeSelected.date,
      userCode: this.jwtHelperSvc.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).Username,
      shift: this.stopTimeSelected.shift,
      remark: this.stopTimeSelected.remark,
    };

    this.validateData(obj);

    if (this.errorMsg) {
      return;
    }

    if (obj.id) {
      this.pihStopLineSvc.updateStopTime(obj).subscribe((response) => {
        this.toastr.success('OK', 'Success');

        let searchParams = {
          startTimeRange: null,
          createdAtRange: [
            new Date().setDate(new Date().getDate() - 14),
            new Date(),
          ],
        };

        this.getStopTimes(searchParams);
        this.isOpenModal = false;
        this.resetData();
      });
      return;
    }

    this.pihStopLineSvc.createStopTime(obj).subscribe((response) => {
      this.toastr.success('OK', 'Success');

      let searchParams = {
        startTimeRange: null,
        createdAtRange: [
          new Date().setDate(new Date().getDate() - 14),
          new Date(),
        ],
      };
      this.getStopTimes(searchParams);
      this.stopTimeSelected.startTime = null;
      this.stopTimeSelected.stopTime = null;
      this.stopTimeSelected.remark = null;

      //this.isOpenModal = false;
      //this.resetData();
    });
  }

  onCancel() {
    this.isOpenModal = false;
    this.resetData();
  }

  resetData() {
    this.stopTimeSelected.id = null;
    this.stopTimeSelected.date = null;
    this.stopTimeSelected.startTime = null;
    this.stopTimeSelected.stopTime = null;
    this.stopTimeSelected.type = null;
    this.stopTimeSelected.group = null;
    this.stopTimeSelected.item = null;
    this.stopTimeSelected.line = null;
    this.stopTimeSelected.shift = null;
    this.stopTimeSelected.remark = null;
  }

  onExportClient(event: any) {}

  onChangeDate($event: any) {
    this.stopTimeSelected.date = $event;
  }

  onChangeStartTime($event: any) {}

  onChangeStopTime($event: any) {}

  validateData(obj: any) {
    if (obj.stopItemId == null) {
      this.errorMsg = 'Item không được để trống';
      return;
    }
    // if (obj.date == null || obj.startTime == null || obj.stopTime == null) {
    //   this.errorMsg = 'Time không được để trống';
    //   return;
    // }

    if (obj.line == null) {
      this.errorMsg = 'Line không được để trống';
      return;
    }

    if (obj.shift == null) {
      this.errorMsg = 'Shift không được để trống';
      return;
    }

    this.errorMsg = null;
  }

  deleteStopTime($event: any) {
    this.pihStopLineSvc.deleteStopTime($event.data.id).subscribe((response) => {
      this.toastr.success(response.response, 'OK');

      let searchParams = {
        startTimeRange: null,
        createdAtRange: [
          new Date().setDate(new Date().getDate() - 14),
          new Date(),
        ],
      };

      this.getStopTimes(searchParams);
    });
  }

  getProductTypeIdByUser() {
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.pihStopLineSvc
      .getProductTypeIdByUser(username)
      .subscribe((response) => {
        console.log('getProductTypeIdByUser: ', response);

        if (response.productTypeId) {
          this.onChangeProductTypes(response.productTypeId);
        }
      });
  }
}
