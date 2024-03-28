import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layer2ModuleComponent } from './layer2-module.component';

const routes: Routes = [
  {
    path: '',
    component: Layer2ModuleComponent,
    children: [
      {
        path:'defect-record',
        loadChildren: () => import('./defect-record/defect-record.module').then(m => m.DefectRecordModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Layer2ModuleRoutingModule { }
