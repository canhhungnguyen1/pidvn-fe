import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFileUploaderModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { IeRoutingModule } from './ie-routing.module';
import { IeComponent } from './ie.component';
import { IeMaDoComponent } from './machine-document/ie-ma-do.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [IeComponent, IeMaDoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IeRoutingModule,
    DxTabsModule,
    NzTabsModule,
    DxTextBoxModule,
    DxFileUploaderModule,
    DxButtonModule,
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzCollapseModule,
    NzGridModule,
    DxDataGridModule,
    NzIconModule
  ],
})
export class IeModule {}
