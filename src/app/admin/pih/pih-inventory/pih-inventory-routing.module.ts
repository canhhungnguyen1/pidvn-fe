import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PihInvMenuComponent } from './pih-inv-menu/pih-inv-menu.component';
import { PihInvRequestComponent } from './pih-inv-request/pih-inv-request.component';

const routes: Routes = [
  {
    path: 'menu',
    component: PihInvMenuComponent
  },
  {
    path: 'request',
    component: PihInvRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PihInventoryRoutingModule { }
