import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PihInventoryRoutingModule } from './pih-inventory-routing.module';
import { PihInventoryComponent } from './pih-inventory.component';
import { PihInvMenuComponent } from './pih-inv-menu/pih-inv-menu.component';
import { PihInvRequestComponent } from './pih-inv-request/pih-inv-request.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { PihInvReqDetailComponent } from './pih-inv-req-detail/pih-inv-req-detail.component';

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
    FormsModule
  ],
})
export class PihInventoryModule {}
