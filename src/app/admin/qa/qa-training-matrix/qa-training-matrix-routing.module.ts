import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaTrainingMatrixMenuComponent } from './qa-training-matrix-menu/qa-training-matrix-menu.component';
import { QaTrainingMatrixRecordComponent } from './qa-training-matrix-record/qa-training-matrix-record.component';


const routes: Routes = [
  {
    path: 'menu',
    component: QaTrainingMatrixMenuComponent
  },
  {
    path: 'record',
    component: QaTrainingMatrixRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaTrainingMatrixRoutingModule { }
