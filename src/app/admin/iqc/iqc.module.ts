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
  DxSelectBoxModule,
} from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IqcRequestDetailComponent } from './iqc-request-detail/iqc-request-detail.component';
import { IqcRequestComponent } from './iqc-request/iqc-request.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzGridModule } from 'ng-zorro-antd/grid';
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
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { IqcRecheckComponent } from './iqc-recheck/iqc-recheck.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';



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
    NzTabsModule
  ],
})
export class IqcModule {}
