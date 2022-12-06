import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import {
  DxDataGridModule
} from 'devextreme-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { VrEncPRInsertComponent } from './vr-enc-p-r-insert/vr-enc-p-r-insert.component';
import { VrEncPRMenuComponent } from './vr-enc-p-r-menu/vr-enc-p-r-menu.component';
import { VrEncPRTraceabilityComponent } from './vr-enc-p-r-traceability/vr-enc-p-r-traceability.component';
import { VrEncProcessRecordingRoutingModule } from './vr-enc-process-recording-routing.module';
import { VrEncProcessRecordingComponent } from './vr-enc-process-recording.component';
import { VrEncPRQacardComponent } from './vr-enc-p-r-qacard/vr-enc-p-r-qacard.component';
import { VrEncPRReturnComponent } from './vr-enc-p-r-return/vr-enc-p-r-return.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    VrEncProcessRecordingComponent,
    VrEncPRMenuComponent,
    VrEncPRInsertComponent,
    VrEncPRTraceabilityComponent,
    VrEncPRQacardComponent,
    VrEncPRReturnComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    VrEncProcessRecordingRoutingModule,
    DxDataGridModule,
    NzBreadCrumbModule,
    NzAlertModule,
    NzGridModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzModalModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzSpinModule,
    NzIconModule
  ],
})
export class VrEncProcessRecordingModule {}
