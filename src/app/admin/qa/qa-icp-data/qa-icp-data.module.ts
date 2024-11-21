import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
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
  DxValidatorModule,
} from 'devextreme-angular';
import { QaIcpDataInsertComponent } from './qa-icp-data-insert/qa-icp-data-insert.component';
import { QaIcpDataRoutingModule } from './qa-icp-data-routing.module';
import { QaIcpDataComponent } from './qa-icp-data.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
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
    NzSelectModule
  ],
})
export class QaIcpDataModule {}
