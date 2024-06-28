import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxDateBoxModule, DxFormModule, DxSelectBoxModule, DxTextBoxModule, DxTooltipModule } from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PmMenuComponent } from './pm-menu/pm-menu.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
    NzButtonModule,
    DxFormModule,
    DxDateBoxModule,
    NzSpaceModule,
    DxTooltipModule,
    NzIconModule
  ]
})
export class ProjectManagementModule { }
