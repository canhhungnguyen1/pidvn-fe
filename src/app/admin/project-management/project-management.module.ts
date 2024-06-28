import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { PmMenuComponent } from './pm-menu/pm-menu.component';
import { DxSelectBoxModule, DxTextBoxModule, DxButtonModule } from 'devextreme-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectManagementComponent,
    PmMenuComponent
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    FormsModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    NzGridModule,
    DxButtonModule,
    NzButtonModule
  ]
})
export class ProjectManagementModule { }
