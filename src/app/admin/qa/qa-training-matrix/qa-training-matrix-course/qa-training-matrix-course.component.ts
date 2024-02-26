import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QaTrainingMatrixService } from '../services/qa-training-matrix.service';

@Component({
  selector: 'app-qa-training-matrix-course',
  templateUrl: './qa-training-matrix-course.component.html',
  styleUrls: ['./qa-training-matrix-course.component.scss'],
})
export class QaTrainingMatrixCourseComponent implements OnInit {
  constructor(
    private router: Router,
    private qaTrainingMatrixSvc: QaTrainingMatrixService
  ) {}

  courses: any;

  ngOnInit(): void {
    this.getCourses()
  }

  

  getCourses() {
    this.qaTrainingMatrixSvc.getCourses().subscribe((response) => {
      this.courses = response;
    });
  }
}
