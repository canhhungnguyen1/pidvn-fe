import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelayInputWipQtyIvtRoutingModule } from './relay-input-wip-qty-ivt-routing.module';
import { RelayInputWipQtyIvtComponent } from './relay-input-wip-qty-ivt.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxPrintModule } from 'ngx-print';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [RelayInputWipQtyIvtComponent],
  imports: [
    CommonModule,
    RelayInputWipQtyIvtRoutingModule,
    NzCollapseModule,
    NzGridModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzTabsModule,
    NgxPrintModule,
    QRCodeModule
  ],
})
export class RelayInputWipQtyIvtModule {}
