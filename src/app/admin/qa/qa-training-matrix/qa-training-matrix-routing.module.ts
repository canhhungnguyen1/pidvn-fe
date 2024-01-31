import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaTrainingMatrixMenuComponent } from './qa-training-matrix-menu/qa-training-matrix-menu.component';


const routes: Routes = [
  {
    path: 'menu',
    component: QaTrainingMatrixMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaTrainingMatrixRoutingModule { }
