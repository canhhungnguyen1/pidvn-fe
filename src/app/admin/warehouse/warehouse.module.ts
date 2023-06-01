import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { MaterialReceiptComponent } from './material-receipt/material-receipt.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { WhIqcRequestComponent } from './wh-iqc-request/wh-iqc-request.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DxDataGridModule } from 'devextreme-angular';
import { CheckDateIqcComponent } from './check-date-iqc/check-date-iqc.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [
    WarehouseComponent,
    MaterialReceiptComponent,
    WhIqcRequestComponent,
    CheckDateIqcComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    WarehouseRoutingModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzCollapseModule,
    NzIconModule,
    NzInputModule,
    NzTabsModule,
    NzGridModule,
    NzFormModule,
    NzTableModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzModalModule,
    NzPaginationModule,
    NzToolTipModule,
    NzSelectModule,
    DxDataGridModule,
    NzSpaceModule,
    NzDividerModule
  ],
  providers: [DatePipe]
})
export class WarehouseModule {}
