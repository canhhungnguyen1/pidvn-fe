import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CqmrMainComponent } from './cqmr-main/cqmr-main.component';

const routes: Routes = [
  {
    path: 'main',
    component: CqmrMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CqmrRoutingModule { }
