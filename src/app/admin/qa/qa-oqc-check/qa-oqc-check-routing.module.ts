import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaOqcCheckComponent } from './qa-oqc-check.component';
import { QaOqcEvaluateComponent } from './qa-oqc-evaluate/qa-oqc-evaluate.component';
import { QaOqcRequestComponent } from './qa-oqc-request/qa-oqc-request.component';

const routes: Routes = [
  {
    path: '',
    component: QaOqcCheckComponent,
    children: [
      {
        path: 'oqc-request',
        component: QaOqcRequestComponent
      },
      {
        path: 'oqc-evaluate',
        component: QaOqcEvaluateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaOqcCheckRoutingModule { }
