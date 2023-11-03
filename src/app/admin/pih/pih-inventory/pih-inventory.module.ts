import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxPivotGridModule } from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PihInvMenuComponent } from './pih-inv-menu/pih-inv-menu.component';
import { PihInvReqDetailComponent } from './pih-inv-req-detail/pih-inv-req-detail.component';
import { PihInvRequestComponent } from './pih-inv-request/pih-inv-request.component';
import { PihInventoryRoutingModule } from './pih-inventory-routing.module';
import { PihInventoryComponent } from './pih-inventory.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    PihInventoryComponent,
    PihInvMenuComponent,
    PihInvRequestComponent,
    PihInvReqDetailComponent,
  ],
  imports: [
    CommonModule,
    PihInventoryRoutingModule,
    NzGridModule,
    DxButtonModule,
    DxDataGridModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    NzInputModule,
    FormsModule,
    NzTabsModule,
    NzPopconfirmModule,
    DxPivotGridModule,
    DxPivotGridModule,
    DxChartModule,
    NzSelectModule,
    NzDatePickerModule
  ],
})
export class PihInventoryModule {}
