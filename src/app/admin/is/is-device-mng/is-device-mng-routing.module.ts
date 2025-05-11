import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsDvMngDevicesComponent } from './is-dv-mng-devices/is-dv-mng-devices.component';
import { IsDvMngMenuComponent } from './is-dv-mng-menu/is-dv-mng-menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: IsDvMngMenuComponent
  },
  {
    path: 'devices',
    component: IsDvMngDevicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsDeviceMngRoutingModule { }
