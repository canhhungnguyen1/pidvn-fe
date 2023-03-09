import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePsiPriceComponent } from './update-psi-price/update-psi-price.component';
import { SalesComponent } from './sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SalesComponent,
    UpdatePsiPriceComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    SalesRoutingModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzGridModule,
    NzTabsModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzTagModule
  ]
})
export class SalesModule { }
