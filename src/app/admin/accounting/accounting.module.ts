import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { StkPaymentComponent } from './stk-payment/stk-payment.component';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { FormsModule } from '@angular/forms';
import {
  DxBulletModule,
  DxButtonModule,
  DxDataGridModule,
  DxNumberBoxModule,
  DxTemplateModule
} from 'devextreme-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [
    AccountingComponent,
    StkPaymentComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    FormsModule,
    NzQRCodeModule,
    NzBreadCrumbModule,
    DxBulletModule,
    DxButtonModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxTemplateModule,
    NzModalModule,
    NzTableModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule
  ]
})
export class AccountingModule { }
