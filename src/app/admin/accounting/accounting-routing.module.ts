import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { StkPaymentComponent } from './stk-payment/stk-payment.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingComponent,
    children: [
      {
        path: 'stk-payment',
        component: StkPaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
