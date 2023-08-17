import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PihInventoryRoutingModule } from './pih-inventory-routing.module';
import { PihInventoryComponent } from './pih-inventory.component';
import { PihInvMenuComponent } from './pih-inv-menu/pih-inv-menu.component';
import { PihInvRequestComponent } from './pih-inv-request/pih-inv-request.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [
    PihInventoryComponent,
    PihInvMenuComponent,
    PihInvRequestComponent,
  ],
  imports: [
    CommonModule,
    PihInventoryRoutingModule,
    NzGridModule,
    DxButtonModule,
    DxDataGridModule,
    NzButtonModule
  ],
})
export class PihInventoryModule {}
