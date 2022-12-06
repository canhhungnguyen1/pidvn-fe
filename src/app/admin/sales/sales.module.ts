import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePsiPriceComponent } from './update-psi-price/update-psi-price.component';
import { SalesComponent } from './sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [
    SalesComponent,
    UpdatePsiPriceComponent
    
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    NzBreadCrumbModule,
    NzButtonModule
  ]
})
export class SalesModule { }
