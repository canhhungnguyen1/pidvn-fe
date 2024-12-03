import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDateRangeBoxModule,
  DxDropDownBoxModule,
  DxFormModule,
  DxHtmlEditorModule,
  DxMapModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RePrMenuComponent } from './re-pr-menu/re-pr-menu.component';
import { RePrReceiveComponent } from './re-pr-receive/re-pr-receive.component';
import { RePrRequestComponent } from './re-pr-request/re-pr-request.component';
import { RePrScanToLineComponent } from './re-pr-scan-to-line/re-pr-scan-to-line.component';
import { RelayProcessRecordingRoutingModule } from './relay-process-recording-routing.module';
import { RelayProcessRecordingComponent } from './relay-process-recording.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [
    RelayProcessRecordingComponent,
    RePrMenuComponent,
    RePrReceiveComponent,
    RePrRequestComponent,
    RePrScanToLineComponent,
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
    NzInputModule,
    NzPopconfirmModule,
    NzAlertModule,
    NzTabsModule
  ],
})
export class RelayProcessRecordingModule {}
