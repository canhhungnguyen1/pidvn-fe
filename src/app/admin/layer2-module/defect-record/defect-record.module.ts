import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  DxCheckBoxModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxButtonModule
} from 'devextreme-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DefectRecordInputComponent } from './defect-record-input/defect-record-input.component';
import { DefectRecordRoutingModule } from './defect-record-routing.module';
import { DefectRecordComponent } from './defect-record.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  declarations: [DefectRecordComponent, DefectRecordInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    DefectRecordRoutingModule,
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    NzSpaceModule,
    DxButtonModule
  ],
})
export class DefectRecordModule {}
