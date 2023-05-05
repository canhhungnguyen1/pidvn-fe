import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  DxBulletModule, DxButtonModule, DxDataGridModule, DxNumberBoxModule, DxTemplateModule
} from 'devextreme-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PackingOqcRequestListComponent } from './packing-oqc-request-list/packing-oqc-request-list.component';
import { PackingOqcRequestRoutingModule } from './packing-oqc-request-routing.module';
import { PackingOqcRequestComponent } from './packing-oqc-request.component';
import { PackingOqcSummaryComponent } from './packing-oqc-summary/packing-oqc-summary.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [PackingOqcRequestComponent, PackingOqcRequestListComponent, PackingOqcSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    PackingOqcRequestRoutingModule,
    DxNumberBoxModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzSelectModule,
    NzInputModule,
    NzTableModule,
    NzAlertModule,
    NzSkeletonModule,
    DxBulletModule,
    DxButtonModule,
    DxDataGridModule,
    DxTemplateModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzCardModule,
    NzRadioModule,
    NzTagModule,
    NzPopconfirmModule
  ],
})
export class PackingOqcRequestModule {}
