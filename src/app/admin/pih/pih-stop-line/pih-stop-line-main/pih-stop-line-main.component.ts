import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { PihStopLineService } from '../services/pih-stop-line.service';

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

  types: any = [];
  groups: any = [];
  items: any = [];
  lines: any = [];
  shifts: any = [];
  stopTimes: any;

  isOpenModal: boolean = false;
  modalTitle!: string;

  errorMsg: string | null = null;
  stopGroups = new Array();
  stopItems = new Array();

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
    remark: null
  };

  

  ngOnInit(): void {
    this.getLines();
    this.getShifts();
    this.getStopTypes();
    this.getStopGroups();
    this.getStopItems();
    this.getStopTimes();
  }

  getLines() {
    this.pihStopLineSvc.getLines().subscribe((response) => {
      this.lines = response;
    });
  }
  getShifts() {
    this.pihStopLineSvc.getShifts().subscribe((response) => {
      this.shifts = response;
    });
  }

  getStopTimes() {
    this.pihStopLineSvc.getStopTimes({}).subscribe((response) => {
      this.stopTimes = response;
      console.log('Data: ', response);
    });
  }

  getStopTypes() {
    this.pihStopLineSvc.getStopTypes().subscribe(
      response => {
        this.types = response
      }
    )
  }

  getStopGroups() {
    this.pihStopLineSvc.getStopGroups().subscribe(
      response => {
        this.groups = response
      }
    )
  }

  getStopItems() {
    this.pihStopLineSvc.getStopItems().subscribe(
      response => {
        this.items = response
      }
    )
  }

  openModal(type: string, data: any) {

    if (type == 'insert') {
      this.modalTitle = 'Thêm dữ liệu dừng Line';
      this.stopTimeSelected.id = null
      //this.stopTimeSelected.item = null
      //this.stopTimeSelected.date = null
      this.stopTimeSelected.startTime = null
      this.stopTimeSelected.stopTime = null
      //this.stopTimeSelected.line = null
      //this.stopTimeSelected.shift = null
    }

    if (type == 'update') {
      this.modalTitle = 'Sửa dữ liệu dừng Line';
      this.stopTimeSelected.type = data.typeId;

      this.stopGroups = new Array();
      for (const group of this.groups) {
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

  onChangeStopTypes($event: any) {
    this.stopGroups = new Array();
    for (const group of this.groups) {
      if (group.stopTypeId == $event) {
        this.stopGroups.push(group);
      }
    }
    console.log('listStopGroup: ', this.stopGroups);
  }

  onChangeStopGroups($event: any) {
    console.log('onChangeStopGroups');
    this.stopItems = new Array();
    for (const item of this.items) {
      if (item.stopGroupId == $event) {
        this.stopItems.push(item);
      }
    }
    console.log('listStopItems: ', this.stopItems);
  }

  onSave() {
    console.log('stopTimeSelectedL ', this.stopTimeSelected);

    let obj = {
      id: this.stopTimeSelected.id,
      stopItemId: this.stopTimeSelected.item,
      line: this.stopTimeSelected.line,
      startTime: this.stopTimeSelected.startTime,
      stopTime: this.stopTimeSelected.stopTime,
      date: this.stopTimeSelected.date,
      userCode : this.jwtHelperSvc.decodeToken(
        localStorage.getItem('accessToken')?.toString()
      ).Username,
      shift: this.stopTimeSelected.shift,
      remark: this.stopTimeSelected.remark
    };

    this.validateData(obj);

    if (this.errorMsg) {
      return;
    }

    if (obj.id) {
      this.pihStopLineSvc.updateStopTime(obj).subscribe(
        response => {
          this.toastr.success('OK','Success')
          this.getStopTimes();
          this.isOpenModal = false;
          this.resetData();
        }
      )
      return;
    }

    this.pihStopLineSvc.createStopTime(obj).subscribe(
      response => {
        this.toastr.success('OK','Success')
        this.getStopTimes();
        this.stopTimeSelected.startTime = null
        this.stopTimeSelected.stopTime = null
        // this.isOpenModal = false;
        //this.resetData();
      }
    )

    
  }

  onCancel() {
    this.isOpenModal = false
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
    this.stopTimeSelected.date = $event
  }

  onChangeStartTime($event: any) {}

  onChangeStopTime($event: any) {}

  validateData(obj: any) {
    if (obj.stopItemId == null) {
      this.errorMsg = 'Item không được để trống';
      return;
    }
    if (obj.date == null || obj.startTime == null || obj.stopTime == null) {
      this.errorMsg = 'Time không được để trống';
      return;
    }

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
    this.pihStopLineSvc.deleteStopTime($event.data.id).subscribe(
      response => {
        this.toastr.success(response.response, 'OK');
        this.getStopTimes();
      }
    )
  }

}
