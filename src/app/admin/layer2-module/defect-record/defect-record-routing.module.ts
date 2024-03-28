import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefectRecordInputComponent } from './defect-record-input/defect-record-input.component';

const routes: Routes = [
  {
    path: 'input',
    component: DefectRecordInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefectRecordRoutingModule { }
