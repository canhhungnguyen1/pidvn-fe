import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { FormsModule } from '@angular/forms';
import {
  DxBulletModule,
  DxButtonModule,
  DxDataGridModule,
  DxNumberBoxModule,
  DxTemplateModule
} from 'devextreme-angular';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PeRoutingModule } from './pe-routing.module';
import { PeStdDummyComponent } from './pe-std-dummy/pe-std-dummy.component';
import { PeComponent } from './pe.component';

@NgModule({
  declarations: [PeComponent, PeStdDummyComponent],
  imports: [
    CommonModule,
    FormsModule,
    PeRoutingModule,
    DxBulletModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    DxDataGridModule,
    DxNumberBoxModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzTableModule,
    NzSelectModule,
    NzInputModule,
    NzPopconfirmModule,
    NzButtonModule
  ],
})
export class PeModule {}
