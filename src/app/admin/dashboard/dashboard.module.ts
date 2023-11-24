import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardTraceabilityComponent } from './dashboard-traceability/dashboard-traceability.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMenuComponent,
    DashboardTraceabilityComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PowerBIEmbedModule,
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
