import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VrComponent } from './vr.component';

const routes: Routes = [
  {
    path: '',
    component: VrComponent,
    children: [
      {
        path:'defect-record',
        loadChildren: () => import('./vr-defect-record/vr-defect-record.module').then(m => m.VrDefectRecordModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VrRoutingModule { }
