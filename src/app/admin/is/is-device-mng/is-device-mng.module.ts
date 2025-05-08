import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsDeviceMngRoutingModule } from './is-device-mng-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { IsDvMngMenuComponent } from './is-dv-mng-menu/is-dv-mng-menu.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { IsDvMngDevicesComponent } from './is-dv-mng-devices/is-dv-mng-devices.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { IsDvMngHistoryComponent } from './is-dv-mng-history/is-dv-mng-history.component';

@NgModule({
  declarations: [IsDvMngMenuComponent, IsDvMngDevicesComponent, IsDvMngHistoryComponent],
  imports: [
    CommonModule,
    IsDeviceMngRoutingModule,
    NzGridModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    NzBreadCrumbModule
  ],
})
export class IsDeviceMngModule {}
