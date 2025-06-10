import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDateRangeBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PihStopLineInputRoutingModule } from './pih-stop-line-input-routing.module';
import { PihStopLineInputComponent } from './pih-stop-line-input.component';
import { PsliInputComponent } from './psli-input/psli-input.component';
import { PsliMenuComponent } from './psli-menu/psli-menu.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PihStopLineInputComponent,
    PsliMenuComponent,
    PsliInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PihStopLineInputRoutingModule,
    NzButtonModule,
    NzGridModule,
    NzFlexModule,
    NzCollapseModule,
    DxButtonModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxDateRangeBoxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxValidationGroupModule,
    DxValidatorModule,
    NzSpaceModule,
    NzModalModule,
    NzTableModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputModule
  ],
})
export class PihStopLineInputModule {}
