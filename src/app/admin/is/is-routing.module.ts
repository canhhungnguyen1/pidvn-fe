import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsComponent } from './is.component';
import { LoggerComponent } from './logger/logger.component';

const routes: Routes = [
    {
        path: '',
        component: IsComponent,
        children: [
            {
                path: 'device-management',
                loadChildren: () => import('./device-management/device-management.module').then(m => m.DeviceManagementModule)
            },
            {
                path: 'logger',
                component: LoggerComponent
            }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IsRoutingModule { }
