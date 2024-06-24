import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReportService } from './reports.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  constructor(
    private jwtHelperSvc: JwtHelperService,
    private reportSvc: ReportService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSections();
    this.jwt = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    );
    this.sectionSelected = this.jwt.SectionCode;
    this.getDynamicReport(this.sectionSelected);
  }

  jwt: any;
  sections: any;
  menus: any;
  sectionSelected: any;

  getSections() {
    this.reportSvc.getSections().subscribe((response) => {
      this.sections = response;
    });
  }

  onSelectSection(event: any) {
    let sectionCode = this.jwt.SectionCode;

    let roles = this.jwt.Roles;

    if (sectionCode == event.code || roles.includes('super_admin')) {
      this.sectionSelected = event.code;
      console.log(this.sectionSelected);
      this.getDynamicReport(this.sectionSelected);
    } else {
      this.toastr.warning('Bạn không có quyền truy cập', 'Warning');
      return;
    }
  }

  getDynamicReport(section: any) {
    this.reportSvc.getDynamicReport(section).subscribe((response) => {
      this.menus = response;
    });
  }
}
