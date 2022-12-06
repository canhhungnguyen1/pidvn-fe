import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialReceiptComponent } from './material-receipt/material-receipt.component';
import { WarehouseComponent } from './warehouse.component';
import { WhIqcRequestComponent } from './wh-iqc-request/wh-iqc-request.component';

const routes: Routes = [
  {
    path: '',
    component: WarehouseComponent,
    children: [
      {
        path: 'material-receipt',
        component: MaterialReceiptComponent,
      },
      {
        path: 'iqc-request',
        component: WhIqcRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
