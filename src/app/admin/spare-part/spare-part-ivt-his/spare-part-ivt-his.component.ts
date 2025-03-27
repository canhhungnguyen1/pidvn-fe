import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';
import DataSource from 'devextreme/data/data_source';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'spare-part-ivt-his',
  templateUrl: './spare-part-ivt-his.component.html',
  styleUrls: ['./spare-part-ivt-his.component.scss'],
})
@Injectable({
  providedIn: 'root', // Hoặc module providers
})
export class SparePartIvtHisComponent implements OnInit {
  [x: string]: any;
data: any;
columns = [ { dataField: "ID", width: 80 }
  , { dataField: "ivt_no" }
  , { dataField: "username" }
  , { dataField: "name"}
  , { dataField: "date_time"}
  , { dataField: "view"}
];
  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.sparePartSvc.getSparePartsivthis().subscribe((response) => {
      console.log(response)
      this.data = response;
    })
      
  }

  onViewDetail(data: any) {
    this.router.navigate(['/admin/spare-part/spare-part-ivt-detail'], { 
      queryParams: { ivt_no: data.data.ivt_no } 
    });
  }

  creat_ivt(){
    this.router.navigate(['/admin/spare-part/spare-part-ivt']);
  }

 
}
