import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WasteMngService } from '../services/waste-mng.service';

@Component({
  selector: 'app-waste-type-master',
  templateUrl: './waste-type-master.component.html',
  styleUrl: './waste-type-master.component.scss',
})
export class WasteTypeMasterComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private wasteMngSvc: WasteMngService
  ) {}

  ngOnInit(): void {
    this.getWasteTypeVer2()
  }

  wasteTypes: any[] = [];
  selectedRows: any;
  selectedIndex = 0

  
  changeTab() {
    this.selectedIndex = 1
  }


  getWasteTypeVer2() {
    this.wasteMngSvc.getWasteTypeVer2({}).subscribe(
      response => {
        this.wasteTypes = response.result
      }
    );
  }

  
  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
    
  }
}
