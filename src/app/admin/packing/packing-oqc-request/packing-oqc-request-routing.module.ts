import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackingOqcRequestListComponent } from './packing-oqc-request-list/packing-oqc-request-list.component';
import { PackingOqcSummaryComponent } from './packing-oqc-summary/packing-oqc-summary.component';

const routes: Routes = [
  {
    path: 'list',
    component: PackingOqcRequestListComponent,
  },
  {
    path: 'summary',
    component: PackingOqcSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackingOqcRequestRoutingModule {}
