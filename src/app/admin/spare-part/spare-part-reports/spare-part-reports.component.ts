import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SparePartService } from '../services/spare-part.service';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-spare-part-reports',
  templateUrl: './spare-part-reports.component.html',
  styleUrls: ['./spare-part-reports.component.scss']
})
export class SparePartReportsComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false })
  sparePartRecordGrid!: DxDataGridComponent;

  date = null

  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    
  }


  sparePartData = [];

  subtitle: any

  sparePartRecordsByPrice: any;

  onChangeMonthChart(event: any) {

    this.subtitle = `${event.getFullYear()}-${event.getMonth() + 1}`;

    this.sparePartSvc.getSparePartDataChart({date: event}).subscribe(
      response => {
        console.log('RESPONSE: ', response.data1);
        this.sparePartData = response.data1
        
      }
    )
  }

  onChangeMonthRecordByPrice(event: any) {

    if (!this.date) {
      this.toastr.warning('Thời gian ko được để trống','Warning')
      return;
    }

    this.sparePartRecordGrid?.instance.beginCustomLoading(
      `Hệ thống đang tải dữ liệu`
    );

    this.sparePartSvc.getSparePartRecordsByStandardPrice({date: event}).subscribe(
      response => {
        this.sparePartRecordsByPrice = response
        this.sparePartRecordGrid.instance.endCustomLoading();
      }
    )
  }



}
