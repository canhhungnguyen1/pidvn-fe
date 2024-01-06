import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SparePartService } from '../services/spare-part.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-spare-part-reports',
  templateUrl: './spare-part-reports.component.html',
  styleUrls: ['./spare-part-reports.component.scss']
})
export class SparePartReportsComponent {
  date = null;

  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService,
    private http: HttpClient
  ) {}


  sparePartData = [];

  subtitle: any

  onChangeMonth(event: any) {

    this.subtitle = `${event.getFullYear()}-${event.getMonth() + 1}`;


    this.sparePartSvc.getSparePartDataChart({date: event}).subscribe(
      response => {
        console.log('RESPONSE: ', response.data1);
        this.sparePartData = response.data1
        
      }
    )
  }

}
