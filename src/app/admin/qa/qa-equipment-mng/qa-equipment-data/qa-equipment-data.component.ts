import { Component,OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QaEquipmentMngService } from '../services/qa-equipment-mng.service';

@Component({
  selector: 'app-qa-equipment-data',
  templateUrl: './qa-equipment-data.component.html',
  styleUrls: ['./qa-equipment-data.component.scss']
})
export class QaEquipmentDataComponent implements OnInit {
  
  constructor(
    private qaEquipmentMngSvc: QaEquipmentMngService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  devices: any;

  isOpenEditDeviceModal: boolean = false

  ngOnInit(): void {
    this.getQaDevices();
  }


  getQaDevices() {

    this.qaEquipmentMngSvc.getQaDevices().subscribe(
      response => {
        this.devices = response;
      }
    )
  }

  openEditDeviceModal(item: any) {
    console.log(item.data)
    this.isOpenEditDeviceModal = true




  }

}
