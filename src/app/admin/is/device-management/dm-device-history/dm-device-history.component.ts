import { Component, OnInit } from '@angular/core';
import { DeviceManagementService } from '../device-management.service';

@Component({
  selector: 'app-dm-device-history',
  templateUrl: './dm-device-history.component.html',
  styleUrls: ['./dm-device-history.component.scss'],
})
export class DmDeviceHistoryComponent implements OnInit {
  constructor(private deviceMngSvc: DeviceManagementService) {}

  searchVo: any = {
    deviceType: null,
    mngCode: null,
    model: null,
    serial: null,
    imei: null,
    employee: null,
    actionType: null
  };

  deviceTypes!: any[];
  users!: any[];
  histories!: any [];

  isOpenModal: boolean = false;
  historySelected: any;

  ngOnInit(): void {
    this.getUsers();
    this.getDeviceType();
    this.getHistories(this.searchVo);
  }

  getUsers() {
    this.deviceMngSvc.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  getDeviceType() {
    this.deviceMngSvc.getDeviceType().subscribe((response) => {
      this.deviceTypes = response;
      console.log(this.deviceTypes);
    });
  }

  getHistories(searchVo: any) {
    this.deviceMngSvc.getHistories(searchVo).subscribe(
      response => {
        this.histories = response;
        console.log('Histories: ', this.histories);
      }
    )
  }

  searchHistories() {
    this.getHistories(this.searchVo);
  }

  onRowClick(data: any) {
    this.historySelected = data;
    this.isOpenModal = true;
  }
}
