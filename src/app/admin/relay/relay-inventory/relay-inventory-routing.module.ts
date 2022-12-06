import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelayInventoryBalanceComponent } from './relay-inventory-balance/relay-inventory-balance.component';
import { RelayInventoryExecuteComponent } from './relay-inventory-execute/relay-inventory-execute.component';
import { RelayInventoryMainComponent } from './relay-inventory-main/relay-inventory-main.component';
import { RelayInventoryRequestComponent } from './relay-inventory-request/relay-inventory-request.component';

const routes: Routes = [
  {
    path: 'main',
    component: RelayInventoryMainComponent
  },
  {
    path: 'requests',
    component: RelayInventoryRequestComponent
  },
  {
    path: 'execute/:id',
    component: RelayInventoryExecuteComponent
  },
  {
    path: 'balance/:id',
    component: RelayInventoryBalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelayInventoryRoutingModule { }
