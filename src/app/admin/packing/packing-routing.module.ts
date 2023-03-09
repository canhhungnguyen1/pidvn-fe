import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackingComponent } from './packing.component';

const routes: Routes = [
  {
    path: '',
    component: PackingComponent,
    children: [
      {
        path: 'packing-oqc-request',
        loadChildren: () =>
          import('./packing-oqc-request/packing-oqc-request.module').then(
            (m) => m.PackingOqcRequestModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackingRoutingModule {}
