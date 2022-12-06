import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrainingRecordService } from '../services/training-record.service';

@Component({
  selector: 'app-tr-course',
  templateUrl: './tr-course.component.html',
  styleUrls: ['./tr-course.component.scss'],
})
export class TrCourseComponent implements OnInit {
  constructor(
    private trainingRecordSvc: TrainingRecordService,
    private toastr: ToastrService
  ) {}

  courses: any;
  courseTypies: any;

  ngOnInit(): void {
    this.getCourses();
    this.getTrainingRecordType();
  }

  getCourses() {
    this.trainingRecordSvc.getCourses().subscribe((reponse) => {
      this.courses = reponse;
      console.log('Courses: ', this.courses);
    });
  }

  getTrainingRecordType() {
    this.trainingRecordSvc.getTrainingRecordType().subscribe((response) => {
      this.courseTypies = response;
    });
  }

  onSaved(event: any) {
    let course = event.changes[0].key;
    let action = event.changes[0].type;

    console.log("course: ", event);
    

    this.trainingRecordSvc.saveCourse(course, action).subscribe((response) => {
      this.toastr.success('OK', 'Saved !');
      this.getCourses();
    });
  }
}
