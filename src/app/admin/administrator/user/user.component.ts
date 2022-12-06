import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private userSvc: UserService) {}

  users!: any[];

  ngOnInit(): void {
    this.getUsers({});
  }

  getUsers(searchVo: any) {
    this.userSvc.getUsers(searchVo).subscribe((response) => {
      this.users = response;
    });
  }
}
