import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { VrDefectRecordRoutingModule } from './vr-defect-record-routing.module';
import { VrDefectRecordComponent } from './vr-defect-record.component';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { VrDefectRecordInputComponent } from './vr-defect-record-input/vr-defect-record-input.component';

@NgModule({
  declarations: [VrDefectRecordComponent, VrDefectRecordInputComponent],
  imports: [
    CommonModule,
    VrDefectRecordRoutingModule,
    FormsModule,
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    NzSpaceModule,
    DxButtonModule,
  ],
})
export class VrDefectRecordModule {}
