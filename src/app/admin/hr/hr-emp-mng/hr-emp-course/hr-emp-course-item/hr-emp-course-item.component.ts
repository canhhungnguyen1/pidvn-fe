import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-emp-course-item',
  templateUrl: './hr-emp-course-item.component.html',
  styleUrls: ['./hr-emp-course-item.component.scss']
})
export class HrEmpCourseItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dataSource = [
    {
      courseName: 'Đào tạo an toàn khi thực hiện 5S',
      
    }
  ]




}
