import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxFileUploaderModule,
  DxFormModule,
  DxHtmlEditorModule,
  DxMapModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxTreeListModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { QaIcpDataInsertComponent } from './qa-icp-data-insert/qa-icp-data-insert.component';
import { QaIcpDataRoutingModule } from './qa-icp-data-routing.module';
import { QaIcpDataComponent } from './qa-icp-data.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCardModule } from 'ng-zorro-antd/card';
@NgModule({
  declarations: [QaIcpDataComponent, QaIcpDataInsertComponent],
  imports: [
    CommonModule,
    FormsModule,
    QaIcpDataRoutingModule,
    DxDateBoxModule,
    DxDropDownBoxModule,
    DxFileUploaderModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxMapModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxTreeListModule,
    DxDataGridModule,
    DxValidatorModule,
    DxSelectBoxModule,
    NzGridModule,
    NzCollapseModule,
    NzIconModule,
    NzSelectModule,
    DxButtonModule,
    NzModalModule,
    NzTableModule,
    NzButtonModule,
    NzSpinModule,
    NzAlertModule,
    DxValidationGroupModule,
    NzPopconfirmModule,
    NzCardModule
  ],
})
export class QaIcpDataModule {}
