import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeStdDummyComponent } from './pe-std-dummy/pe-std-dummy.component';
import { PeComponent } from './pe.component';

const routes: Routes = [
  {
    path: '',
    component: PeComponent,
    children: [
      {
        path: 'std-dummy',
        component: PeStdDummyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeRoutingModule {}
