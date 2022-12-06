import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PihProcessRecordingInsertComponent } from './pih-process-recording-insert/pih-process-recording-insert.component';
import { PihProcessRecordingLabelChangeComponent } from './pih-process-recording-label-change/pih-process-recording-label-change.component';
import { PihProcessRecordingMainComponent } from './pih-process-recording-main/pih-process-recording-main.component';
import { PihProcessRecordingModelChangeComponent } from './pih-process-recording-model-change/pih-process-recording-model-change.component';
import { PihProcessRecordingTraceabilityComponent } from './pih-process-recording-traceability/pih-process-recording-traceability.component';

const routes: Routes = [
  {
    path: 'main',
    component: PihProcessRecordingMainComponent
  },
  {
    path: 'insert',
    component: PihProcessRecordingInsertComponent
  },
  {
    path: 'label-change',
    component: PihProcessRecordingLabelChangeComponent
  },
  {
    path: 'model-change',
    component: PihProcessRecordingModelChangeComponent
  },
  {
    path: 'traceability',
    component: PihProcessRecordingTraceabilityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PihProcessRecordingRoutingModule { }
