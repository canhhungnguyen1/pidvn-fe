import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PihInvMenuComponent } from './pih-inv-menu/pih-inv-menu.component';
import { PihInvRequestComponent } from './pih-inv-request/pih-inv-request.component';
import { PihInvReqDetailComponent } from './pih-inv-req-detail/pih-inv-req-detail.component';

const routes: Routes = [
  {
    path: 'menu',
    component: PihInvMenuComponent
  },
  {
    path: 'request',
    component: PihInvRequestComponent
  },
  {
    path: 'request/:id',
    component: PihInvReqDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PihInventoryRoutingModule { }
