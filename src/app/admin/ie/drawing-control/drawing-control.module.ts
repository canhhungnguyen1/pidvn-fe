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


@NgModule({
  declarations: [
    DrawingControlComponent,
    IeDcMenuComponent,
    IeDcProjectComponent,
    IeDcProjectDetailComponent,
  ],
  imports: [
    CommonModule,
    DrawingControlRoutingModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    NzGridModule,
    NzProgressModule
  ],
})
export class DrawingControlModule {}
