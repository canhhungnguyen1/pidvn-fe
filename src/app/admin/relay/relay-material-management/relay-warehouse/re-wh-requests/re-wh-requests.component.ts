import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReWhService } from '../services/re-wh.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-re-wh-requests',
  templateUrl: './re-wh-requests.component.html',
  styleUrls: ['./re-wh-requests.component.scss'],
})
export class ReWhRequestsComponent implements OnInit, AfterViewInit {

  @ViewChild(DxDataGridComponent, { static: false })
  requestGrid!: DxDataGridComponent;

  constructor(private router: Router, private reWhSvc: ReWhService) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.getListPXK();
  }

  slips: any;

  

  getListPXK() {
    this.requestGrid?.instance.beginCustomLoading(
      `Đang load dữ liệu ...`
    );

    this.reWhSvc.getSlips().subscribe((response) => {
      this.slips = response;
      this.requestGrid.instance.endCustomLoading();
    });
  }

  onRowClick(event: any) {
    // this.router.navigate([
    //   `admin/relay/material-management/re-wh-requests/${event.data.slipNo}`,
    // ]);


    this.router.navigate([
      `admin/relay/relay-process-recording/request?requestNo=${event.data.slipNo}`,
    ]);

  }
}
