import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';
import { UpdatePsiPriceComponent } from './update-psi-price/update-psi-price.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'update-psi-price',
        component: UpdatePsiPriceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
