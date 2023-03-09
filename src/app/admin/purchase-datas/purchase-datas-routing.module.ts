import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { PsiByMonthComponent } from './psi-by-month/psi-by-month.component';
import { PurchaseDatasComponent } from './purchase-datas.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseDatasComponent,
    children: [
      {
        path: 'balance-sheet',
        component: BalanceSheetComponent
      },
      {
        path: 'psi-by-month',
        component: PsiByMonthComponent
      },        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseDatasRoutingModule { }
