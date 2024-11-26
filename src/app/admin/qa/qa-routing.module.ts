import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaComponent } from './qa.component';
import { QaMaterialChecksheetComponent } from './qa-material-checksheet/qa-material-checksheet.component';

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
      {
        path: 'qa-oqc-check',
        loadChildren: () =>
          import('./qa-oqc-check/qa-oqc-check.module').then(
            (m) => m.QaOqcCheckModule
          ),
      },
      {
        path: 'qa-oqc-document',
        loadChildren: () => import('./qa-oqc-document/qa-oqc-document.module').then(m => m.QaOqcDocumentModule)
      },
      {
        path: 'qa-equipment-mng',
        loadChildren: () => import('./qa-equipment-mng/qa-equipment-mng.module').then(m => m.QaEquipmentMngModule)
      },
      {
        path: 'qa-training-matrix',
        loadChildren: () => import('./qa-training-matrix/qa-training-matrix.module').then(m => m.QaTrainingMatrixModule)
      },
      {
        path: 'qa-icp-data',
        loadChildren: () => import('./qa-icp-data/qa-icp-data.module').then(m => m.QaIcpDataModule)
      },
      {
        path: 'qa-material-checksheet',
        component: QaMaterialChecksheetComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QaRoutingModule { }
