import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelayProcessRecordingRoutingModule } from './relay-process-recording-routing.module';
import { RelayProcessRecordingComponent } from './relay-process-recording.component';
import { RePrMenuComponent } from './re-pr-menu/re-pr-menu.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { RePrReceiveComponent } from './re-pr-receive/re-pr-receive.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RePrRequestComponent } from './re-pr-request/re-pr-request.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DxDateRangeBoxModule } from 'devextreme-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  DxFormModule,
  DxHtmlEditorModule,
  DxTextBoxModule,
  DxNumberBoxModule,
  DxDateBoxModule,
  DxMapModule,
  DxValidatorModule,
  DxDropDownBoxModule,
} from 'devextreme-angular';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RelayProcessRecordingComponent,
    RePrMenuComponent,
    RePrReceiveComponent,
    RePrRequestComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RelayProcessRecordingRoutingModule,
    NzGridModule,
    NzFlexModule,
    NzSpaceModule,
    NzCollapseModule,
    NzSelectModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    NzButtonModule,
    NzIconModule,
    DxDateRangeBoxModule,
    NzModalModule,
    NzTableModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxMapModule,
    DxValidatorModule,
    DxDropDownBoxModule,
    NzTagModule,
    NzInputModule
  ],
})
export class RelayProcessRecordingModule {}
