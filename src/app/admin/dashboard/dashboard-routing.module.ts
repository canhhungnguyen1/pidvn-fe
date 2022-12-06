import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardTraceabilityComponent } from './dashboard-traceability/dashboard-traceability.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'menu',
        component: DashboardMenuComponent
      },
      {
        path: 'traceability',
        component: DashboardTraceabilityComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
