import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsDvMngMenuComponent } from './is-dv-mng-menu/is-dv-mng-menu.component';
import { IsDvMngDevicesComponent } from './is-dv-mng-devices/is-dv-mng-devices.component';
import { IsDvMngHistoryComponent } from './is-dv-mng-history/is-dv-mng-history.component';

const routes: Routes = [
  {
    path: 'menu',
    component: IsDvMngMenuComponent
  },
  {
    path: 'devices',
    component: IsDvMngDevicesComponent
  },
  {
    path: 'history',
    component: IsDvMngHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsDeviceMngRoutingModule { }
