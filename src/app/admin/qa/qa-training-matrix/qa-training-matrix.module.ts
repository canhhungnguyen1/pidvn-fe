import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaTrainingMatrixComponent } from './qa-training-matrix.component';
import { QaTrainingMatrixMenuComponent } from './qa-training-matrix-menu/qa-training-matrix-menu.component';
import { QaTrainingMatrixRoutingModule } from './qa-training-matrix-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { QaTrainingMatrixRecordComponent } from './qa-training-matrix-record/qa-training-matrix-record.component';


@NgModule({
  declarations: [
    QaTrainingMatrixComponent,
    QaTrainingMatrixMenuComponent,
    QaTrainingMatrixRecordComponent
  ],
  imports: [
    CommonModule,
    QaTrainingMatrixRoutingModule,
    NzGridModule
  ]
})
export class QaTrainingMatrixModule { }
