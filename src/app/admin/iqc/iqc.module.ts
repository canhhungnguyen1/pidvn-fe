import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { IqcRoutingModule } from './iqc-routing.module';
import { IqcComponent } from './iqc.component';

import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IqcRequestComponent } from './iqc-request/iqc-request.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IqcComponent, IqcRequestComponent],
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
    NzDatePickerModule
  ],
})
export class IqcModule {}
