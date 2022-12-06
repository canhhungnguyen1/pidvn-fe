import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule } from 'devextreme-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PihProcessRecordingInsertComponent } from './pih-process-recording-insert/pih-process-recording-insert.component';
import { PihProcessRecordingLabelChangeComponent } from './pih-process-recording-label-change/pih-process-recording-label-change.component';
import { PihProcessRecordingMainComponent } from './pih-process-recording-main/pih-process-recording-main.component';
import { PihProcessRecordingModelChangeComponent } from './pih-process-recording-model-change/pih-process-recording-model-change.component';
import { PihProcessRecordingRoutingModule } from './pih-process-recording-routing.module';
import { PihProcessRecordingComponent } from './pih-process-recording.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PihProcessRecordingTraceabilityComponent } from './pih-process-recording-traceability/pih-process-recording-traceability.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    PihProcessRecordingComponent,
    PihProcessRecordingMainComponent,
    PihProcessRecordingInsertComponent,
    PihProcessRecordingLabelChangeComponent,
    PihProcessRecordingModelChangeComponent,
    PihProcessRecordingTraceabilityComponent,
  ],
  imports: [
    CommonModule,
    PihProcessRecordingRoutingModule,
    FormsModule,
    DxDataGridModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzAlertModule,
    NzModalModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzIconModule
  ],
})
export class PihProcessRecordingModule {}
