import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RePrMenuComponent } from './re-pr-menu/re-pr-menu.component';
import { RePrReceiveComponent } from './re-pr-receive/re-pr-receive.component';
import { RePrRequestComponent } from './re-pr-request/re-pr-request.component';

const routes: Routes = [
  {
    path: 'menu',
    component: RePrMenuComponent,
  },
  {
    path: 'requests',
    component: RePrRequestComponent
  },
  {
    path: 'request',
    component: RePrReceiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelayProcessRecordingRoutingModule { }
