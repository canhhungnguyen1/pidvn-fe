import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule } from 'devextreme-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RelayMaterialTraceabilityComponent } from './relay-material-admin/relay-material-traceability/relay-material-traceability.component';
import { RelayMaterialManagementRoutingModule } from './relay-material-management-routing.module';
import { RelayMaterialManagementComponent } from './relay-material-management.component';
import { LwhChangeQacardComponent } from './relay-process-recording/lwh-change-qacard/lwh-change-qacard.component';
import { LwhReceiveLineComponent } from './relay-process-recording/lwh-receive-line/lwh-receive-line.component';
import { LwhSendLineComponent } from './relay-process-recording/lwh-send-line/lwh-send-line.component';
import { RePrMenuComponent } from './relay-process-recording/re-pr-menu/re-pr-menu.component';
import { RelayMappingQacardComponent } from './relay-process-recording/relay-mapping-qacard/relay-mapping-qacard.component';
import { ReWhMenuComponent } from './relay-warehouse/re-wh-menu/re-wh-menu.component';
import { ReWhRequestsComponent } from './relay-warehouse/re-wh-requests/re-wh-requests.component';
import { RwhReceiveLwhComponent } from './relay-warehouse/rwh-receive-lwh/rwh-receive-lwh.component';
import { RwhReceivePwhComponent } from './relay-warehouse/rwh-receive-pwh/rwh-receive-pwh.component';
import { RwhSendLwhComponent } from './relay-warehouse/rwh-send-lwh/rwh-send-lwh.component';
import { RwhSendPwhComponent } from './relay-warehouse/rwh-send-pwh/rwh-send-pwh.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
@NgModule({
  declarations: [
    RelayMaterialManagementComponent,
    ReWhMenuComponent,
    ReWhRequestsComponent,
    RwhReceivePwhComponent,
    RePrMenuComponent,
    LwhReceiveLineComponent,
    LwhSendLineComponent,
    RwhSendLwhComponent,
    LwhChangeQacardComponent,
    RelayMaterialTraceabilityComponent,
    RwhSendPwhComponent,
    RwhReceiveLwhComponent,
    RelayMappingQacardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RelayMaterialManagementRoutingModule,
    DxDataGridModule,
    NzCardModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzModalModule,
    NzTagModule,
    NzDividerModule,
    NzSelectModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule,
    NzAlertModule,
    NzRadioModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzTabsModule,
    NzFlexModule,
    NzSpaceModule
  ],
})
export class RelayMaterialManagementModule {}
