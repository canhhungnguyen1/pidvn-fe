import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { DeviceManagementComponent } from './device-management.component';
import { DmDeviceListComponent } from './dm-device-list/dm-device-list.component';
import { DmDeviceHistoryComponent } from './dm-device-history/dm-device-history.component';

@NgModule({
  declarations: [DeviceManagementComponent, DmDeviceListComponent, DmDeviceHistoryComponent],
  imports: [
    CommonModule,
    DeviceManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzGridModule,
    NzSelectModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzIconModule
  ],
})
export class DeviceManagementModule {}
