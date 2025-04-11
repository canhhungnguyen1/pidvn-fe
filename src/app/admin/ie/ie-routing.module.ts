import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IeComponent } from './ie.component';
import { IeMaDoComponent } from './machine-document/ie-ma-do.component';

const routes: Routes = [
  {
    path: '',
    component: IeComponent,
    children: [
      {
        path: 'drawing-control',
        loadChildren: () => import('./drawing-control/drawing-control.module').then(m => m.DrawingControlModule)
      },
      {
        path: 'machine-document',
        component: IeMaDoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IeRoutingModule { }
