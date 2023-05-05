import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackingRoutingModule } from './packing-routing.module';
import { PackingComponent } from './packing.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';


@NgModule({
  declarations: [
    PackingComponent,
  ],
  imports: [
    CommonModule,
    PackingRoutingModule,
    NzBreadCrumbModule,
  ]
})
export class PackingModule { }
