import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaOqcCheckComponent } from './qa-oqc-check.component';
import { QaOqcEvaluateComponent } from './qa-oqc-evaluate/qa-oqc-evaluate.component';
import { QaOqcRequestComponent } from './qa-oqc-request/qa-oqc-request.component';
import { QaOqcAbnormalRequestComponent } from './qa-oqc-abnormal-request/qa-oqc-abnormal-request.component';
import { QaOqcAbnormalRequestDetailComponent } from './qa-oqc-abnormal-request-detail/qa-oqc-abnormal-request-detail.component';

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
      },
      {
        path: 'oqc-abnormal-requests',
        component: QaOqcAbnormalRequestComponent
      },
      {
        path: 'oqc-abnormal-request/:reqNo',
        component: QaOqcAbnormalRequestDetailComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaOqcCheckRoutingModule { }
