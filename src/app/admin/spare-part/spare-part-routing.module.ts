import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SparePartMenuComponent } from './spare-part-menu/spare-part-menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: SparePartMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparePartRoutingModule { }
