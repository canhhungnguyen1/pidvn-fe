import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HrEmpCourseService } from '../../services/hr-emp-course.service';

@Component({
  selector: 'app-hr-emp-course-item',
  templateUrl: './hr-emp-course-item.component.html',
  styleUrls: ['./hr-emp-course-item.component.scss']
})
export class HrEmpCourseItemComponent implements OnInit {

  constructor(
    private hrEmpCourseSvc: HrEmpCourseService,
    private jwtHelperService: JwtHelperService
  ) { }

  dataSource: any;

  ngOnInit(): void {
    this.getCourseGroups();
  }

  getCourseGroups() {
    let username = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.hrEmpCourseSvc.getCourseGroups().subscribe(
      response => {
        this.dataSource = response
      }
    )
  }

  




}
