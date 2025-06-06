import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainQaIqcComponent } from './main-qa-iqc/main-qa-iqc.component';
import { QaIqcCheckComponent } from './qa-iqc-check.component';
import { QaIqcRequestComponent } from './qa-iqc-request/qa-iqc-request.component';
import { QaIqcResultDetailComponent } from './qa-iqc-result-detail/qa-iqc-result-detail.component';
import { QaIqcResultMasterComponent } from './qa-iqc-result-master/qa-iqc-result-master.component';
import { QaIqcDataComponent } from './qa-iqc-data/qa-iqc-data.component';
import { QaIqcRecheckComponent } from './qa-iqc-recheck/qa-iqc-recheck.component';

const routes: Routes = [
  {
    path: '',
    component: QaIqcCheckComponent,
    children: [
      {
        path: 'main',
        component: MainQaIqcComponent,
      },
      {
        path: 'iqc-request',
        component: QaIqcRequestComponent
      },
      {
        path: 'iqc-result-master',
        component: QaIqcResultMasterComponent
      },
      {
        path: 'iqc-result-detail',
        component: QaIqcResultDetailComponent
      },
      {
        path: 'iqc-data',
        component: QaIqcDataComponent
      },
      {
        path: 'iqc-recheck',
        component: QaIqcRecheckComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QaIqcCheckRoutingModule { }
