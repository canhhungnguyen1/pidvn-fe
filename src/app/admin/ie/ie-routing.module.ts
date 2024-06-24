import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IeComponent } from './ie.component';

const routes: Routes = [
  {
    path: '',
    component: IeComponent,
    children: [
      {
        path: 'drawing-control',
        loadChildren: () => import('./drawing-control/drawing-control.module').then(m => m.DrawingControlModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IeRoutingModule { }
