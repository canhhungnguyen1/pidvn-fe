import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxFileUploaderModule, DxFormModule, DxTooltipModule } from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { TrainingRecordDetailComponent } from './training-record-detail/training-record-detail.component';
import { TrainingRecordMasterComponent } from './training-record-master/training-record-master.component';
import { TrainingRecordRoutingModule } from './training-record-routing.module';
import { TrainingRecordComponent } from './training-record.component';
import { TrCourseComponent } from './tr-course/tr-course.component';
import { TrainingRecordHistoryComponent } from './training-record-history/training-record-history.component';

@NgModule({
  declarations: [
    TrainingRecordComponent,
    TrainingRecordDetailComponent,
    TrainingRecordMasterComponent,
    TrCourseComponent,
    TrainingRecordHistoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TrainingRecordRoutingModule,
    DxFormModule,
    DxDataGridModule,
    DxButtonModule,
    DxDropDownBoxModule,
    DxFileUploaderModule,
    DxTooltipModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzGridModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzTableModule,
    NzCollapseModule,
    NzPopconfirmModule,
    NzUploadModule,
    NzImageModule
  ],
})
export class TrainingRecordModule {}
