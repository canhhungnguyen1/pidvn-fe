import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SparePartMenuComponent } from './spare-part-menu/spare-part-menu.component';
import { SparePartsComponent } from './spare-parts/spare-parts.component';
import { SparePartInOutComponent } from './spare-part-in-out/spare-part-in-out.component';
import { SparePartInventoryComponent } from './spare-part-inventory/spare-part-inventory.component';

const routes: Routes = [
  {
    path: 'menu',
    component: SparePartMenuComponent
  },
  {
    path: 'spare-parts',
    component: SparePartsComponent
  },
  {
    path: 'spare-part-in-out',
    component: SparePartInOutComponent
  },
  {
    path: 'spare-part-inventory',
    component: SparePartInventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparePartRoutingModule { }
