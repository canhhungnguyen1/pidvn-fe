import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QRCodeModule } from 'angularx-qrcode';
import {
  DxBulletModule,
  DxButtonModule,
  DxDataGridModule,
  DxTemplateModule
} from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxPrintModule } from 'ngx-print';
import { QaEquipmentDetailComponent } from './qa-equipment-detail/qa-equipment-detail.component';
import { QaEquipmentLabelCreateComponent } from './qa-equipment-label-create/qa-equipment-label-create.component';
import { QaEquipmentListComponent } from './qa-equipment-list/qa-equipment-list.component';
import { QaEquipmentMenuComponent } from './qa-equipment-menu/qa-equipment-menu.component';
import { QaEquipmentMngRoutingModule } from './qa-equipment-mng-routing.module';
import { QaEquipmentMngComponent } from './qa-equipment-mng.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { QaEquipmentDataComponent } from './qa-equipment-data/qa-equipment-data.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
@NgModule({
  declarations: [
    QaEquipmentMngComponent,
    QaEquipmentLabelCreateComponent,
    QaEquipmentMenuComponent,
    QaEquipmentListComponent,
    QaEquipmentDetailComponent,
    QaEquipmentDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    QaEquipmentMngRoutingModule,
    QRCodeModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxButtonModule,
    NgxPrintModule,
    NzUploadModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzCollapseModule,
    NzTableModule,
    NzTabsModule,
    NzSelectModule,
    NzInputModule,
    NzPopconfirmModule,
    NzFormModule,
    NzQRCodeModule
  ],
})
export class QaEquipmentMngModule {}
