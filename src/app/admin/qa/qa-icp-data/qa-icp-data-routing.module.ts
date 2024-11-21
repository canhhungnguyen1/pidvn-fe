import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaIcpDataComponent } from './qa-icp-data.component';
import { QaIcpDataInsertComponent } from './qa-icp-data-insert/qa-icp-data-insert.component';

const routes: Routes = [
  {
    path: '',
    component: QaIcpDataComponent,
    children: [
      {
        path: 'insert',
        component: QaIcpDataInsertComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaIcpDataRoutingModule { }
