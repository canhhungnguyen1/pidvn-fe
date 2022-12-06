import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaComponent } from './qa.component';

const routes: Routes = [
  {
    path: '',
    component: QaComponent,
    children: [
      {
        path: 'qa-iqc-check',
        loadChildren: () =>
          import('./qa-iqc-check/qa-iqc-check.module').then(
            (m) => m.QaIqcCheckModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QaRoutingModule {}
