import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PihComponent } from './pih.component';

const routes: Routes = [
  {
    path: '',
    component: PihComponent,
    children: [
      {
        path: 'pih-stop-line',
        loadChildren: () =>
          import('./pih-stop-line/pih-stop-line.module').then(
            (m) => m.PihStopLineModule
          ),
      },
      {
        path: 'pih-stop-line/v2',
        loadChildren: () =>
          import('./pih-stop-line-input/pih-stop-line-input.module').then(
            (m) => m.PihStopLineInputModule
          ),
      },
      {
        path: 'pih-process-recording',
        loadChildren: () =>
          import('./pih-process-recording/pih-process-recording.module').then(
            (m) => m.PihProcessRecordingModule
          ),
      },
      {
        path: 'pih-inventory',
        loadChildren: () =>
          import('./pih-inventory/pih-inventory.module').then(
            (m) => m.PihInventoryModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PihRoutingModule {}
