import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReportService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  constructor(
    private jwtHelperService: JwtHelperService,
    private reportSvc: ReportService
  ) {}

  ngOnInit(): void {
    this.getSections()
  }

  sections: any;
  menus: any
  sectionSelected: any;

  getSections() {
    this.reportSvc.getSections().subscribe((response) => {
      this.sections = response;
    });
  }

  onSelectSection(event: any) {
    
    
    this.reportSvc.getDynamicReport(event.code).subscribe(
      response => {
        this.menus = response
      }
    )
    this.sectionSelected = event.code
    console.log(this.sectionSelected);
  }
}
