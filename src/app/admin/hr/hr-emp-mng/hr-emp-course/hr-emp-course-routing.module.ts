import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrEmpCourseHistoryComponent } from './hr-emp-course-history/hr-emp-course-history.component';
import { HrEmpCourseItemComponent } from './hr-emp-course-item/hr-emp-course-item.component';
import { HrEmpCourseMenuComponent } from './hr-emp-course-menu/hr-emp-course-menu.component';
import { HrEmpCourseScheduleComponent } from './hr-emp-course-schedule/hr-emp-course-schedule.component';

const routes: Routes = [
  {
    path:'menu',
    component: HrEmpCourseMenuComponent
  },
  {
    path: 'item',
    component: HrEmpCourseItemComponent
  },
  {
    path: 'schedule',
    component: HrEmpCourseScheduleComponent
  },
  {
    path: 'histories',
    component: HrEmpCourseHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrEmpCourseRoutingModule { }
