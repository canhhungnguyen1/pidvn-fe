import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { UpdatePsiPriceComponent } from './update-psi-price/update-psi-price.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { DxHtmlEditorModule } from 'devextreme-angular';
@NgModule({
  declarations: [SalesComponent, UpdatePsiPriceComponent],
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
    NzTagModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzIconModule,
    NzModalModule,
    NzInputNumberModule,
    DxHtmlEditorModule
  ],
})
export class SalesModule {}
