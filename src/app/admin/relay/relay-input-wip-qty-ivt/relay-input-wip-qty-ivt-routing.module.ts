import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelayInputWipQtyIvtComponent } from './relay-input-wip-qty-ivt.component';

const routes: Routes = [
  {
    path: '',
    component: RelayInputWipQtyIvtComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelayInputWipQtyIvtRoutingModule { }
