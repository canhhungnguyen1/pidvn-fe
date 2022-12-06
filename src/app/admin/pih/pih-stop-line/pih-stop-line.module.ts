import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { PihStopLineMainComponent } from './pih-stop-line-main/pih-stop-line-main.component';
import { PihStopLineRoutingModule } from './pih-stop-line-routing.module';
import { PihStopLineComponent } from './pih-stop-line.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@NgModule({
  declarations: [PihStopLineComponent, PihStopLineMainComponent],
  imports: [
    CommonModule,
    PihStopLineRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzGridModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzModalModule,
    NzButtonModule,
    NzTableModule,
    NzSelectModule,
    NzInputModule,
    NzAlertModule,
    NzPopconfirmModule
  ],
})
export class PihStopLineModule {}
