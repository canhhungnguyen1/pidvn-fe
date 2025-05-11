import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { IsDeviceMngRoutingModule } from './is-device-mng-routing.module';
import { IsDvMngDevicesComponent } from './is-dv-mng-devices/is-dv-mng-devices.component';
import { IsDvMngHistoryComponent } from './is-dv-mng-history/is-dv-mng-history.component';
import { IsDvMngMenuComponent } from './is-dv-mng-menu/is-dv-mng-menu.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
@NgModule({
  declarations: [IsDvMngMenuComponent, IsDvMngDevicesComponent, IsDvMngHistoryComponent],
  imports: [
    CommonModule,
    IsDeviceMngRoutingModule,
    NzGridModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    NzBreadCrumbModule,
    NzTabsModule,
    NzModalModule,
    NzTableModule,
    NzDividerModule
  ],
})
export class IsDeviceMngModule {}
