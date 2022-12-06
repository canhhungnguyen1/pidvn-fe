import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrCourseComponent } from './tr-course/tr-course.component';
import { TrainingRecordDetailComponent } from './training-record-detail/training-record-detail.component';
import { TrainingRecordHistoryComponent } from './training-record-history/training-record-history.component';
import { TrainingRecordMasterComponent } from './training-record-master/training-record-master.component';

const routes: Routes = [
  {
    path: 'masters',
    component: TrainingRecordMasterComponent
  },
  {
    path: 'master/:id',
    component: TrainingRecordDetailComponent
  },
  {
    path: 'courses',
    component: TrCourseComponent
  },
  {
    path: 'history',
    component: TrainingRecordHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRecordRoutingModule { }
