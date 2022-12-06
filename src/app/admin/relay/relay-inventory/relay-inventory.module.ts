import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RelayInventoryExecuteComponent } from './relay-inventory-execute/relay-inventory-execute.component';
import { RelayInventoryMainComponent } from './relay-inventory-main/relay-inventory-main.component';
import { RelayInventoryRequestComponent } from './relay-inventory-request/relay-inventory-request.component';
import { RelayInventoryRoutingModule } from './relay-inventory-routing.module';
import { RelayInventoryComponent } from './relay-inventory.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RelayInventoryBalanceComponent } from './relay-inventory-balance/relay-inventory-balance.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
@NgModule({
  declarations: [
    RelayInventoryComponent,
    RelayInventoryMainComponent,
    RelayInventoryRequestComponent,
    RelayInventoryExecuteComponent,
    RelayInventoryBalanceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RelayInventoryRoutingModule,
    NzBreadCrumbModule,
    DxButtonModule,
    DxDataGridModule,
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzTagModule,
    NzModalModule,
    NzAlertModule,
    NzToolTipModule,
    NzButtonModule,
    NzDatePickerModule,
    NzSkeletonModule,
    NzSpinModule,
    NzTabsModule
  ],
})
export class RelayInventoryModule {}
