import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MeasurementService } from '../services/measurement.service';

@Component({
  selector: 'app-main-measurement',
  templateUrl: './main-measurement.component.html',
  styleUrls: ['./main-measurement.component.scss'],
})
export class MainMeasurementComponent implements OnInit {
  constructor(private router: Router, private measureSvc: MeasurementService, private toastr: ToastrService) { }

  roles: any;

  ngOnInit(): void {
    this.roles = atob(localStorage.getItem('roles')!);
  }

  clickBtnItem() {

    this.router.navigate(['admin/relay/measurement/items'], {
      queryParams: { type: 'execute' },
    });

    // let hasPermission = 
    //   this.roles?.includes('super_admin') || 
    //   this.roles?.includes('measurement_leader') || 
    //   this.roles?.includes('measurement_worker')

    // if (hasPermission) {
    //   this.router.navigate(['admin/relay/measurement/items'], {
    //     queryParams: { type: 'execute' },
    //   });
    // } else {
    //   this.toastr.error('Bạn không có quyền truy cập !', 'Access Denied !')
    //   return;
    // }

  }

  clickBtnData() {
    this.router.navigate(['admin/relay/measurement/items'], {
      queryParams: { type: 'management' },
    });

    // let hasPermission = 
    //   this.roles?.includes('super_admin') || 
    //   this.roles?.includes('measurement_leader')

    // if (hasPermission) {
    //   this.router.navigate(['admin/relay/measurement/items'], {
    //     queryParams: { type: 'management' },
    //   });
    // } else {
    //   this.toastr.error('Bạn không có quyền truy cập !', 'Access Denied !')
    //   return;
    // }
  }

  clickBtnDataExport() {

    this.router.navigate(['admin/relay/measurement/items'], {
      queryParams: { type: 'export' },
    });

    // let hasPermission = 
    //   this.roles?.includes('super_admin') || 
    //   this.roles?.includes('measurement_leader') || 
    //   this.roles?.includes('measurement_worker') ||
    //   this.roles?.includes('measurement_export')

    // if (hasPermission) {
    //   this.router.navigate(['admin/relay/measurement/items'], {
    //     queryParams: { type: 'export' },
    //   });
    // } else {
    //   this.toastr.error('Bạn không có quyền truy cập !', 'Access Denied !')
    //   return;
    // }
  }

  clickBtnXbarChart() {
    this.router.navigate(['admin/relay/measurement/xbar-chart-list']);
  }

  showGuideline() {
    this.measureSvc.showGuideline().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}
