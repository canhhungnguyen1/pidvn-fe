import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SparePartService } from '../services/spare-part.service';
import DataSource from 'devextreme/data/data_source';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'spare-part-ivt-detail',
  templateUrl: './spare-part-ivt-detail.component.html',
  styleUrls: ['./spare-part-ivt-detail.component.scss'],
})
@Injectable({
  providedIn: 'root', // Hoặc module providers
})
export class SparePartIvtDetailComponent implements OnInit {
data: any;
ivtNo: any  ;

  constructor(
    private toastr: ToastrService,
    private sparePartSvc: SparePartService,
    private jwtHelperSvc: JwtHelperService,
    private route: ActivatedRoute,
     private router: Router
  ) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.ivtNo = params['ivt_no'];
    });
    this.ivt_detail(this.ivtNo)
  }
      

  ivt_detail(ivtNo: any){
    console.log(ivtNo);
    this.sparePartSvc.getSparePartsivtDetail(ivtNo).subscribe(
      (res) => {
        this.data = res
        console.log("Dữ liệu trả về từ API:", res);
      },
      (error) => {
        console.error("Lỗi khi gọi API:", error);
      }
    );

  }


  back_to_ivthis(){
    this.router.navigate(['/admin/spare-part/spare-part-ivt-his']);
  }
 
}
