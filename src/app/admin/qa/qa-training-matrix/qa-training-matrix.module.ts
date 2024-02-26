import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaTrainingMatrixComponent } from './qa-training-matrix.component';
import { QaTrainingMatrixMenuComponent } from './qa-training-matrix-menu/qa-training-matrix-menu.component';
import { QaTrainingMatrixRoutingModule } from './qa-training-matrix-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { QaTrainingMatrixRecordComponent } from './qa-training-matrix-record/qa-training-matrix-record.component';
import { QaTrainingMatrixCourseComponent } from './qa-training-matrix-course/qa-training-matrix-course.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  DxBulletModule,
  DxButtonModule,
  DxDataGridModule,
  DxNumberBoxModule,
  DxTemplateModule,
} from 'devextreme-angular';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    QaTrainingMatrixComponent,
    QaTrainingMatrixMenuComponent,
    QaTrainingMatrixRecordComponent,
    QaTrainingMatrixCourseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    QaTrainingMatrixRoutingModule,
    NzGridModule,
    NzTabsModule,
    NzTableModule,
    NzRadioModule,
    NzCollapseModule,
    NzUploadModule,
    NzMessageModule,
    NzButtonModule,
    DxBulletModule,
    DxButtonModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxTemplateModule,
    NzSpaceModule,
    NzDatePickerModule,
    NzSelectModule,
    NzIconModule
  ]
})
export class QaTrainingMatrixModule {}
