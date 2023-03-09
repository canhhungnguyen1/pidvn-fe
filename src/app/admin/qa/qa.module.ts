import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { QaIqcCheckComponent } from './qa-iqc-check/qa-iqc-check.component';
import { QaRoutingModule } from './qa-routing.module';


@NgModule({
  declarations: [QaIqcCheckComponent],
  imports: [
    CommonModule,
    QaRoutingModule,
    FormsModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzSelectModule,
    NzGridModule,
    NzInputModule,
    NzCollapseModule,
    NzButtonModule,
    NzDatePickerModule,
    NzIconModule,
  ],
})
export class QaModule {}
