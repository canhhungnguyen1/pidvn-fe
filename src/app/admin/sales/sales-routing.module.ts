import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';
import { UpdatePsiPriceComponent } from './update-psi-price/update-psi-price.component';
import { ActualDppDataComponent } from './actual-dpp-data/actual-dpp-data.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'update-psi-price',
        component: UpdatePsiPriceComponent
      },
      {
        path: 'actual-dpp-data',
        component: ActualDppDataComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
