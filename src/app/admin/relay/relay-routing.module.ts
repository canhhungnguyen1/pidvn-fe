import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { RelayComponent } from './relay.component';

const routes: Routes = [
  {
    path: '',
    component: RelayComponent,
    children: [
      {
        path: 'measurement',
        loadChildren: () =>
          import('./measurement/measurement.module').then(
            (m) => m.MeasurementModule
          ),
      },
      {
        path: 'check-sheet',
        loadChildren: () =>
          import(
            './check-sheet-line-process/check-sheet-line-process.module'
          ).then((m) => m.CheckSheetLineProcessModule),
      },
      {
        path: 'training-record',
        loadChildren: () =>
          import('./training-record/training-record.module').then(
            (m) => m.TrainingRecordModule
          ),
      },
      {
        path: 'cqmr',
        loadChildren: () =>
          import('./cqmr/cqmr-routing.module').then((m) => m.CqmrRoutingModule),
      },
      {
        path: 'material-management',
        loadChildren: () =>
          import(
            './relay-material-management/relay-material-management.module'
          ).then((m) => m.RelayMaterialManagementModule),
      },
      {
        path: 'relay-inventory',
        loadChildren: () =>
          import('./relay-inventory/relay-inventory.module').then(
            (m) => m.RelayInventoryModule
          ),
      },
      {
        path: 'relay-datecode',
        loadChildren: () =>
          import('./relay-datecode/relay-datecode.module').then(
            (m) => m.RelayDatecodeModule
          ),
      },
      {
        path: 'relay-input-wip-qty-ivt',
        loadChildren: () =>
          import(
            './relay-input-wip-qty-ivt/relay-input-wip-qty-ivt.module'
          ).then((m) => m.RelayInputWipQtyIvtModule),
      },
      {
        path: 'vr-enc-process-recording',
        loadChildren: () =>
          import(
            './vr-enc-process-recording/vr-enc-process-recording.module'
          ).then((m) => m.VrEncProcessRecordingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelayRoutingModule {}
