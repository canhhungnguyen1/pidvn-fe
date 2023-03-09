import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxPivotGridModule } from 'devextreme-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { PurchaseDatasRoutingModule } from './purchase-datas-routing.module';
import { PurchaseDatasComponent } from './purchase-datas.component';
import { PsiByMonthComponent } from './psi-by-month/psi-by-month.component';

@NgModule({
  declarations: [
    PurchaseDatasComponent,
    BalanceSheetComponent,
    PsiByMonthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PurchaseDatasRoutingModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzSpinModule,
    NzIconModule,
    DxDataGridModule,
    NzBreadCrumbModule,
    NzAlertModule,
    NzGridModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzModalModule,
    NzPopconfirmModule,
    NzButtonModule,
    DxPivotGridModule,   
  ]
})
export class PurchaseDatasModule { }
