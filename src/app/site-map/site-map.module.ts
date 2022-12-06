import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RelayProjectListComponent } from './relay-site-map/relay-project-list/relay-project-list.component';
import { RelaySiteMapComponent } from './relay-site-map/relay-site-map.component';
import { SiteMapRoutingModule } from './site-map-routing.module';
import { SiteMapComponent } from './site-map.component';
@NgModule({
  declarations: [
    SiteMapComponent,
    RelaySiteMapComponent,
    RelayProjectListComponent
  ],
  imports: [
    CommonModule,
    SiteMapRoutingModule,
    NzGridModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzTableModule
  ]
})
export class SiteMapModule { }
