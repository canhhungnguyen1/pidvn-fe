import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DxButtonModule, DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { SparePartInOutComponent } from './spare-part-in-out/spare-part-in-out.component';
import { SparePartMenuComponent } from './spare-part-menu/spare-part-menu.component';
import { SparePartRoutingModule } from './spare-part-routing.module';
import { SparePartComponent } from './spare-part.component';
import { SparePartsComponent } from './spare-parts/spare-parts.component';

import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { DxChartModule, DxPieChartModule, DxTextBoxModule } from 'devextreme-angular';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxPrintModule } from 'ngx-print';
import { SparePartIvtReqDetailComponent } from './spare-part-inventory/spare-part-ivt-req-detail/spare-part-ivt-req-detail.component';
import { SparePartIvtReqComponent } from './spare-part-inventory/spare-part-ivt-req/spare-part-ivt-req.component';
import { SparePartPrintQrComponent } from './spare-part-print-qr/spare-part-print-qr.component';
import { SparePartReportsComponent } from './spare-part-reports/spare-part-reports.component';
import { SparePartRequestsComponent } from './spare-part-requests/spare-part-requests.component';

@NgModule({
  declarations: [
    SparePartComponent,
    SparePartMenuComponent,
    SparePartsComponent,
    SparePartInOutComponent,
    SparePartIvtReqComponent,
    SparePartIvtReqDetailComponent,
    SparePartReportsComponent,
    SparePartPrintQrComponent,
    SparePartRequestsComponent
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
    NgxPrintModule,
    DxTextBoxModule,
    DxSelectBoxModule
  ],
})
export class SparePartModule {}
