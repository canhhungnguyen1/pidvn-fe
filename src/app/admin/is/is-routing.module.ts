import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsComponent } from './is.component';

const routes: Routes = [
    {
        path: '',
        component: IsComponent,
        children: [
            {
                path: 'device-management',
                loadChildren: () => import('./device-management/device-management.module').then(m => m.DeviceManagementModule)
            }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IsRoutingModule { }
