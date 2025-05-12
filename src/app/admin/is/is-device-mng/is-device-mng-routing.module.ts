import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsDvMngDevicesComponent } from './is-dv-mng-devices/is-dv-mng-devices.component';
import { IsDvMngMenuComponent } from './is-dv-mng-menu/is-dv-mng-menu.component';
import { IsDvMngIvtReqComponent } from './is-dv-mng-inventory/is-dv-mng-ivt-req/is-dv-mng-ivt-req.component';
import { IsDvMngIvtReqDetailComponent } from './is-dv-mng-inventory/is-dv-mng-ivt-req-detail/is-dv-mng-ivt-req-detail.component';

const routes: Routes = [
  {
    path: 'menu',
    component: IsDvMngMenuComponent,
  },
  {
    path: 'devices',
    component: IsDvMngDevicesComponent,
  },
  {
    path: 'inventory-requests',
    component: IsDvMngIvtReqComponent
  },
  {
    path: 'inventory-requests/:id',
    component: IsDvMngIvtReqDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IsDeviceMngRoutingModule {}
