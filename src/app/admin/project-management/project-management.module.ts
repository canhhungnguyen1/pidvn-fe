import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { PmMenuComponent } from './pm-menu/pm-menu.component';
import { DxSelectBoxModule, DxTextBoxModule, DxButtonModule } from 'devextreme-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [
    ProjectManagementComponent,
    PmMenuComponent
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    NzGridModule,
    DxButtonModule
  ]
})
export class ProjectManagementModule { }
