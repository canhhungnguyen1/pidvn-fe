import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefectRecordRoutingModule } from './defect-record-routing.module';
import { DefectRecordComponent } from './defect-record.component';
import { DefectRecordInputComponent } from './defect-record-input/defect-record-input.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    DefectRecordComponent,
    DefectRecordInputComponent
  ],
  imports: [
    CommonModule,
    DefectRecordRoutingModule,
    NzTableModule,
    NzGridModule,
    NzInputModule
  ]
})
export class DefectRecordModule { }
