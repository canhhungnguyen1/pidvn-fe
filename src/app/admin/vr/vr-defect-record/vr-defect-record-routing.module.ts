import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VrDefectRecordInputComponent } from './vr-defect-record-input/vr-defect-record-input.component';

const routes: Routes = [
  {
    path: 'input',
    component: VrDefectRecordInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VrDefectRecordRoutingModule { }
