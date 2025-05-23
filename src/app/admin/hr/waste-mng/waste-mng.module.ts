import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxPivotGridModule } from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { WasteDataManagementComponent } from './waste-data-management/waste-data-management.component';
import { WasteDetailDataComponent } from './waste-detail-data/waste-detail-data.component';
import { WasteMainComponent } from './waste-main/waste-main.component';
import { WasteMasterDataComponent } from './waste-master-data/waste-master-data.component';
import { WasteMngRoutingModule } from './waste-mng-routing.module';
import { WasteMngComponent } from './waste-mng.component';
import { WasteTypeMasterComponent } from './waste-type-master/waste-type-master.component';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule } from 'ngx-print';
@NgModule({
  declarations: [
    WasteMngComponent,
    WasteMainComponent,
    WasteMasterDataComponent,
    WasteDetailDataComponent,
    WasteDataManagementComponent,
    WasteTypeMasterComponent,
  ],
  imports: [
    CommonModule,
    WasteMngRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxPivotGridModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzModalModule,
    NzSelectModule,
    NzTableModule,
    NzUploadModule,
    NzDividerModule,
    NzDatePickerModule,
    NzCollapseModule,
    NzTabsModule,
    NzPopconfirmModule,
    NzImageModule,
    NzQRCodeModule,
    QRCodeModule,
    NgxPrintModule
  ],
})
export class WasteMngModule {}
