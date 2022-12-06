import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserTmsService } from '../services/user-tms.service';

@Component({
  selector: 'app-user-tms',
  templateUrl: './user-tms.component.html',
  styleUrls: ['./user-tms.component.scss'],
})
export class UserTmsComponent implements OnInit {
  constructor(
    private userTmsSvc: UserTmsService,
    private jwtHelperSvc: JwtHelperService
  ) {}

  attendances: any;

  ngOnInit(): void {
    this.getAttendanceDetails();
  }

  getAttendanceDetails() {
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;
    this.userTmsSvc.getAttendanceDetails(username).subscribe((response) => {
      this.attendances = response;
    });
  }
}
