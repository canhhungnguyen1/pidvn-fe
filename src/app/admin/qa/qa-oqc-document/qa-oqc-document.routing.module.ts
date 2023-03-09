import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaOqcDocumentDetailComponent } from './qa-oqc-document-detail/qa-oqc-document-detail.component';
import { QaOqcDocumentModelsComponent } from './qa-oqc-document-models/qa-oqc-document-models.component';
import { QaOqcDocumentComponent } from './qa-oqc-document.component';

const routes: Routes = [
  {
    path: '',
    component: QaOqcDocumentComponent,
    children: [
      {
        path: 'models',
        component: QaOqcDocumentModelsComponent
      },
      {
        path: 'detail',
        component: QaOqcDocumentDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QaOqcDocumentRoutingModule {}