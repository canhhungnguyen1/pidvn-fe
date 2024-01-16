import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparePartRoutingModule } from './spare-part-routing.module';
import { SparePartComponent } from './spare-part.component';
import { SparePartMenuComponent } from './spare-part-menu/spare-part-menu.component';
import { SparePartsComponent } from './spare-parts/spare-parts.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SparePartInOutComponent } from './spare-part-in-out/spare-part-in-out.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { SparePartIvtReqComponent } from './spare-part-inventory/spare-part-ivt-req/spare-part-ivt-req.component';
import { SparePartIvtReqDetailComponent } from './spare-part-inventory/spare-part-ivt-req-detail/spare-part-ivt-req-detail.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { QRCodeModule } from 'angularx-qrcode';
import { SparePartReportsComponent } from './spare-part-reports/spare-part-reports.component';
import { DxChartModule } from 'devextreme-angular';
import { DxPieChartModule } from 'devextreme-angular';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    SparePartComponent,
    SparePartMenuComponent,
    SparePartsComponent,
    SparePartInOutComponent,
    SparePartIvtReqComponent,
    SparePartIvtReqDetailComponent,
    SparePartReportsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SparePartRoutingModule,
    NzGridModule,
    DxButtonModule,
    DxDataGridModule,
    NzQRCodeModule,
    NzButtonModule,
    NzSpaceModule,
    NzIconModule,
    NzTabsModule,
    NzModalModule,
    NzTableModule,
    NzSelectModule,
    NzInputModule,
    NzInputNumberModule,
    NzPopconfirmModule,
    NzRadioModule,
    NzUploadModule,
    NzDatePickerModule,
    QRCodeModule,
    DxChartModule,
    DxPieChartModule,
    NgxPrintModule
  ],
})
export class SparePartModule {}
