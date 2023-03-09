import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HrEmpCourseService } from '../../services/hr-emp-course.service';

@Component({
  selector: 'app-hr-emp-course-history',
  templateUrl: './hr-emp-course-history.component.html',
  styleUrls: ['./hr-emp-course-history.component.scss']
})
export class HrEmpCourseHistoryComponent implements OnInit {

  constructor(
    private hrEmpCourseSvc: HrEmpCourseService,
    private jwtHelperService: JwtHelperService
  ) { }

  histories: any;

  ngOnInit(): void {
    this.getCourseHistories();
  }

  getCourseHistories() {
    let username = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.hrEmpCourseSvc.getCourseHistories({}).subscribe(
      response => {
        this.histories = response
      }
    )
  }

}
