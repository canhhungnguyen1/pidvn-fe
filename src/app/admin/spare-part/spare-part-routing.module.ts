import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SparePartMenuComponent } from './spare-part-menu/spare-part-menu.component';
import { SparePartsComponent } from './spare-parts/spare-parts.component';
import { SparePartInOutComponent } from './spare-part-in-out/spare-part-in-out.component';
import { SparePartIvtReqComponent } from './spare-part-inventory/spare-part-ivt-req/spare-part-ivt-req.component';
import { SparePartIvtReqDetailComponent } from './spare-part-inventory/spare-part-ivt-req-detail/spare-part-ivt-req-detail.component';
import { SparePartReportsComponent } from './spare-part-reports/spare-part-reports.component';
import { SparePartRequestsComponent } from './spare-part-requests/spare-part-requests.component';


const routes: Routes = [
  {
    path: 'menu',
    component: SparePartMenuComponent
  },
  {
    path: 'spare-parts',
    component: SparePartsComponent
  },
  {
    path: 'spare-part-in-out',
    component: SparePartInOutComponent
  },
  {
    path: 'spare-part-inventory-request',
    component: SparePartIvtReqComponent
  },
  {
    path: 'spare-part-inventory-request/:id',
    component: SparePartIvtReqDetailComponent
  },
  {
    path: 'spare-part-reports',
    component: SparePartReportsComponent
  },
  {
    path: 'spare-part-requests',
    component: SparePartRequestsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparePartRoutingModule { }
