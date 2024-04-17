import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrEmpCourseRoutingModule } from './hr-emp-course-routing.module';
import { HrEmpCourseMenuComponent } from './hr-emp-course-menu/hr-emp-course-menu.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HrEmpCourseHistoryComponent } from './hr-emp-course-history/hr-emp-course-history.component';
import { HrEmpCourseScheduleComponent } from './hr-emp-course-schedule/hr-emp-course-schedule.component';
import { HrEmpCourseItemComponent } from './hr-emp-course-item/hr-emp-course-item.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxButtonModule
} from 'devextreme-angular';
import { NzUploadModule } from 'ng-zorro-antd/upload';
@NgModule({
  declarations: [
    HrEmpCourseMenuComponent,
    HrEmpCourseHistoryComponent,
    HrEmpCourseScheduleComponent,
    HrEmpCourseItemComponent,
  ],
  imports: [
    CommonModule,
    HrEmpCourseRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxButtonModule,
    NzGridModule,
    NzTableModule,
    NzBreadCrumbModule,
    NzSpaceModule,
    NzButtonModule,
    NzModalModule,
    NzUploadModule
  ],
})
export class HrEmpCourseModule {}
