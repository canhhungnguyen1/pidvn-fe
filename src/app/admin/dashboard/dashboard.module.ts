import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardTraceabilityComponent } from './dashboard-traceability/dashboard-traceability.component';
import { DashboardComponent } from './dashboard.component';
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMenuComponent,
    DashboardTraceabilityComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzTimelineModule,
    NzIconModule,
    NzGridModule,
    NzCollapseModule,
    NzTableModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class DashboardModule {}
