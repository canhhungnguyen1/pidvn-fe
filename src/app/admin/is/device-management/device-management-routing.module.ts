import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceManagementComponent } from './device-management.component';
import { DmDeviceHistoryComponent } from './dm-device-history/dm-device-history.component';
import { DmDeviceListComponent } from './dm-device-list/dm-device-list.component';

const routes: Routes = [
    {
        path:'',
        component: DeviceManagementComponent,
        children: [
            {
                path: 'list',
                component: DmDeviceListComponent
            },
            {
                path: 'histories',
                component: DmDeviceHistoryComponent
            }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DeviceManagementRoutingModule { }
