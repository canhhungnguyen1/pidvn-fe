import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MainQaIqcComponent } from './main-qa-iqc/main-qa-iqc.component';
import { QaIqcCheckRoutingModule } from './qa-iqc-check-routing.module';
import { QaIqcRequestComponent } from './qa-iqc-request/qa-iqc-request.component';
import { QaIqcResultDetailComponent } from './qa-iqc-result-detail/qa-iqc-result-detail.component';
import { QaIqcResultMasterComponent } from './qa-iqc-result-master/qa-iqc-result-master.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [
    MainQaIqcComponent,
    QaIqcRequestComponent,
    QaIqcResultMasterComponent,
    QaIqcResultDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    QaIqcCheckRoutingModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzIconModule,
    NzTableModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzModalModule,
    NzInputModule,
    NzRadioModule,
    NzCollapseModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzSwitchModule
  ],
})
export class QaIqcCheckModule {}
