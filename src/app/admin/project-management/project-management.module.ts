import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { PmMenuComponent } from './pm-menu/pm-menu.component';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    ProjectManagementComponent,
    PmMenuComponent
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    DxTextBoxModule,
    DxSelectBoxModule
  ]
})
export class ProjectManagementModule { }
