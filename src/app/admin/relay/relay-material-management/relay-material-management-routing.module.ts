import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { RelayMaterialTraceabilityComponent } from './relay-material-admin/relay-material-traceability/relay-material-traceability.component';
import { LwhChangeQacardComponent } from './relay-process-recording/lwh-change-qacard/lwh-change-qacard.component';
import { LwhReceiveLineComponent } from './relay-process-recording/lwh-receive-line/lwh-receive-line.component';
import { LwhSendLineComponent } from './relay-process-recording/lwh-send-line/lwh-send-line.component';
import { RePrMenuComponent } from './relay-process-recording/re-pr-menu/re-pr-menu.component';
import { RelayMappingQacardComponent } from './relay-process-recording/relay-mapping-qacard/relay-mapping-qacard.component';
import { ReWhMenuComponent } from './relay-warehouse/re-wh-menu/re-wh-menu.component';
import { ReWhRequestsComponent } from './relay-warehouse/re-wh-requests/re-wh-requests.component';
import { RwhReceiveLwhComponent } from './relay-warehouse/rwh-receive-lwh/rwh-receive-lwh.component';
import { RwhReceivePwhComponent } from './relay-warehouse/rwh-receive-pwh/rwh-receive-pwh.component';
import { RwhSendLwhComponent } from './relay-warehouse/rwh-send-lwh/rwh-send-lwh.component';
import { RwhSendPwhComponent } from './relay-warehouse/rwh-send-pwh/rwh-send-pwh.component';

const routes: Routes = [
  {
    path: 're-wh-menu',
    component: ReWhMenuComponent,
    canActivate: [RoleGuard],
    data: {
      roles: ['super_admin', 'MA Relay Level 1'],
    },
  },
  {
    path: 're-wh-requests',
    component: ReWhRequestsComponent,
  },
  {
    path: 're-wh-requests/:slipNo',
    component: RwhReceivePwhComponent,
  },
  {
    path: 're-pr-menu',
    component: RePrMenuComponent,
  },
  {
    path: 'rwh-send-lwh',
    component: RwhSendLwhComponent,
  },
  {
    path: 'rwh-receive-lwh',
    component: RwhReceiveLwhComponent
  },
  {
    path: 'rwh-send-pwh',
    component: RwhSendPwhComponent
  },
  {
    path: 'lwh-send-line',
    component: LwhSendLineComponent
  },
  {
    path: 'lwh-receive-line',
    component: LwhReceiveLineComponent
  },
  {
    path: 'lwh-change-qacard',
    component: LwhChangeQacardComponent
  },
  {
    path: 'relay-mapping-qacard',
    component: RelayMappingQacardComponent
  },
  {
    path: 'relay-material-traceability',
    component: RelayMaterialTraceabilityComponent,
    canActivate: [RoleGuard],
    data: {
      roles: ['super_admin', 'MA Leader'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelayMaterialManagementRoutingModule {}
