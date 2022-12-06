import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VrEncPRInsertComponent } from './vr-enc-p-r-insert/vr-enc-p-r-insert.component';
import { VrEncPRMenuComponent } from './vr-enc-p-r-menu/vr-enc-p-r-menu.component';
import { VrEncPRQacardComponent } from './vr-enc-p-r-qacard/vr-enc-p-r-qacard.component';
import { VrEncPRReturnComponent } from './vr-enc-p-r-return/vr-enc-p-r-return.component';
import { VrEncPRTraceabilityComponent } from './vr-enc-p-r-traceability/vr-enc-p-r-traceability.component';

const routes: Routes = [
  {
    path: 'menu',
    component: VrEncPRMenuComponent
  },
  {
    path: 'insert',
    component: VrEncPRInsertComponent
  },
  {
    path: 'qa-card',
    component: VrEncPRQacardComponent
  },
  {
    path: 'traceability',
    component: VrEncPRTraceabilityComponent
  },
  {
    path: 'return',
    component: VrEncPRReturnComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VrEncProcessRecordingRoutingModule { }
