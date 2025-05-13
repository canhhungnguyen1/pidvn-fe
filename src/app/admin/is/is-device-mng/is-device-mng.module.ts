import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { IsDeviceMngRoutingModule } from './is-device-mng-routing.module';
import { IsDvMngDevicesComponent } from './is-dv-mng-devices/is-dv-mng-devices.component';
import { IsDvMngMenuComponent } from './is-dv-mng-menu/is-dv-mng-menu.component';
import { IsDvMngIvtReqComponent } from './is-dv-mng-inventory/is-dv-mng-ivt-req/is-dv-mng-ivt-req.component';
import { IsDvMngIvtReqDetailComponent } from './is-dv-mng-inventory/is-dv-mng-ivt-req-detail/is-dv-mng-ivt-req-detail.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [
    IsDvMngMenuComponent,
    IsDvMngDevicesComponent,
    IsDvMngIvtReqComponent,
    IsDvMngIvtReqDetailComponent
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
    NzSelectModule
    
  ],
})
export class IsDeviceMngModule {}
