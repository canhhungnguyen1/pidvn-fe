import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDateRangeBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  DxDropDownBoxModule
} from 'devextreme-angular/ui/drop-down-box';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxPrintModule } from 'ngx-print';
import { IsDeviceMngRoutingModule } from './is-device-mng-routing.module';
import { IsDvMngDevicesComponent } from './is-dv-mng-devices/is-dv-mng-devices.component';
import { IsDvMngIvtReqDetailComponent } from './is-dv-mng-inventory/is-dv-mng-ivt-req-detail/is-dv-mng-ivt-req-detail.component';
import { IsDvMngIvtReqComponent } from './is-dv-mng-inventory/is-dv-mng-ivt-req/is-dv-mng-ivt-req.component';
import { IsDvMngMenuComponent } from './is-dv-mng-menu/is-dv-mng-menu.component';

@NgModule({
  declarations: [
    IsDvMngMenuComponent,
    IsDvMngDevicesComponent,
    IsDvMngIvtReqComponent,
    IsDvMngIvtReqDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IsDeviceMngRoutingModule,
    NzGridModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    NzBreadCrumbModule,
    NzTabsModule,
    NzModalModule,
    NzTableModule,
    NzDividerModule,
    NzImageModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpinModule,
    NzAlertModule,
    NzSelectModule,
    NzToolTipModule,
    NzSpaceModule,
    QRCodeModule,
    NgxPrintModule,
    DxDateRangeBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxDateBoxModule,
    DxDropDownBoxModule,
  ],
})
export class IsDeviceMngModule {}
