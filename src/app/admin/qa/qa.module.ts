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
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { QaIqcCheckComponent } from './qa-iqc-check/qa-iqc-check.component';
import { QaRoutingModule } from './qa-routing.module';
import { QaMaterialChecksheetComponent } from './qa-material-checksheet/qa-material-checksheet.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
@NgModule({
  declarations: [QaIqcCheckComponent, QaMaterialChecksheetComponent],
  imports: [
    CommonModule,
    QaRoutingModule,
    FormsModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzSelectModule,
    NzGridModule,
    NzInputModule,
    NzCollapseModule,
    NzButtonModule,
    NzDatePickerModule,
    NzIconModule,
    DxDataGridModule,
    NzIconModule,
    NzModalModule,
    DxButtonModule,
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
    NzButtonModule,
    NzTableModule,
    NzInputModule,
    NzRadioModule,
    NzTabsModule,
    NzPopconfirmModule,
    NzTagModule
  ],
})
export class QaModule {}
