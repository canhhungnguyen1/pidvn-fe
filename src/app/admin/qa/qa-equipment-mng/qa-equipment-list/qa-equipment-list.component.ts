import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QaEquipmentMngService } from '../services/qa-equipment-mng.service';

@Component({
  selector: 'app-qa-equipment-list',
  templateUrl: './qa-equipment-list.component.html',
  styleUrls: ['./qa-equipment-list.component.scss']
})
export class QaEquipmentListComponent implements OnInit {

  constructor(private qaEquipmentMngSvc: QaEquipmentMngService,private router: Router) { }

  ngOnInit(): void {
    this.getQaDevices()
  }

  devices: any;

  getQaDevices() {
    this.qaEquipmentMngSvc.getQaDevices().subscribe(
      response => {
        this.devices = response
      }
    )
  }

  onRowClick(event: any) {
    console.log(event);
    // this.router.navigate(['admin/qa/qa-equipment-mng/devices'], {
    //   queryParams: {
    //     deviceNo: event.data.deviceNo,
    //   },
    // });

    this.router.navigate([`admin/qa/qa-equipment-mng/devices/${event.data.id}`]);
  }

  scanLabel(event: any) {
    this.qaEquipmentMngSvc.getByDeviceNo(event.target.value).subscribe(
      response => {
        console.log('Device: ', response);
      }
    )
    
  }

  
}
