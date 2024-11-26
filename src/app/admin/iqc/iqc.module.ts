import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { IqcRoutingModule } from './iqc-routing.module';
import { IqcComponent } from './iqc.component';

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
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IqcRecheckComponent } from './iqc-recheck/iqc-recheck.component';
import { IqcRequestDetailComponent } from './iqc-request-detail/iqc-request-detail.component';
import { IqcRequestComponent } from './iqc-request/iqc-request.component';


@NgModule({
  declarations: [IqcComponent, IqcRequestComponent, IqcRequestDetailComponent, IqcRecheckComponent],
  imports: [
    CommonModule,
    FormsModule,
    IqcRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    NzDatePickerModule,
    NzModalModule,
    NzTableModule,
    NzSelectModule,
    NzInputModule,
    NzRadioModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzGridModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxMapModule,
    DxValidatorModule,
    DxDropDownBoxModule,
    NzCheckboxModule,
    NzTabsModule,
    NzTagModule,
    DxDateRangeBoxModule
  ],
})
export class IqcModule {}
