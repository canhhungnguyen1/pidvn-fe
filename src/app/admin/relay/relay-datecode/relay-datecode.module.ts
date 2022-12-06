import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelayDatecodeRoutingModule } from './relay-datecode-routing.module';
import {  RelayDatecodeComponent } from './relay-datecode.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { FormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DxDataGridModule } from 'devextreme-angular';
@NgModule({
  declarations: [
    RelayDatecodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RelayDatecodeRoutingModule,
    DxDataGridModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzTableModule,
    NzGridModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzInputModule,
    NzTabsModule
  ]
})
export class RelayDatecodeModule { }
