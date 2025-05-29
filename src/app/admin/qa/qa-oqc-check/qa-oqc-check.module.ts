import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  DxBulletModule, DxDataGridModule, DxTemplateModule
} from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { QaOqcCheckRoutingModule } from './qa-oqc-check-routing.module';
import { QaOqcCheckComponent } from './qa-oqc-check.component';
import { QaOqcEvaluateComponent } from './qa-oqc-evaluate/qa-oqc-evaluate.component';
import { QaOqcRequestComponent } from './qa-oqc-request/qa-oqc-request.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DxFileUploaderModule } from 'devextreme-angular';
import { QaOqcAbnormalRequestComponent } from './qa-oqc-abnormal-request/qa-oqc-abnormal-request.component';
import { QaOqcAbnormalRequestDetailComponent } from './qa-oqc-abnormal-request-detail/qa-oqc-abnormal-request-detail.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
@NgModule({
  declarations: [
    QaOqcCheckComponent,
    QaOqcRequestComponent,
    QaOqcEvaluateComponent,
    QaOqcAbnormalRequestComponent,
    QaOqcAbnormalRequestDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QaOqcCheckRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzTableModule,
    NzInputModule,
    NzRadioModule,
    NzTabsModule,
    NzButtonModule,
    NzSpaceModule,
    NzModalModule,
    NzSelectModule,
    NzGridModule,
    NzUploadModule,
    NzIconModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzTagModule,
    DxFileUploaderModule,
    NzSkeletonModule,
    NzSpinModule,
    NzAlertModule
  ],
})
export class QaOqcCheckModule {}
