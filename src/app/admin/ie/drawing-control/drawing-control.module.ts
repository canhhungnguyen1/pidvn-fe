import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawingControlRoutingModule } from './drawing-control-routing.module';
import { DrawingControlComponent } from './drawing-control.component';
import { IeDcMenuComponent } from './ie-dc-menu/ie-dc-menu.component';
import { IeDcProjectComponent } from './ie-dc-project/ie-dc-project.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { IeDcProjectDetailComponent } from './ie-dc-project-detail/ie-dc-project-detail.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';

import { DxFileUploaderModule } from 'devextreme-angular';
import { DxTreeListModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    DrawingControlComponent,
    IeDcMenuComponent,
    IeDcProjectComponent,
    IeDcProjectDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DrawingControlRoutingModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    NzGridModule,
    NzProgressModule,
    NzTimelineModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    NzDatePickerModule,
    DxFileUploaderModule,
    DxTreeListModule
  ],
})
export class DrawingControlModule {}
