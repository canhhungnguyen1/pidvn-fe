import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { IeRoutingModule } from './ie-routing.module';
import { IeComponent } from './ie.component';
import { IeMaDoComponent } from './machine-document/ie-ma-do.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {
  DxTextBoxModule,
  DxFileUploaderModule,
  DxButtonModule,
} from 'devextreme-angular';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
@NgModule({
  declarations: [IeComponent, IeMaDoComponent],
  imports: [
    CommonModule,
    IeRoutingModule,
    DxTabsModule,
    NzTabsModule,
    DxTextBoxModule,
    DxFileUploaderModule,
    DxButtonModule,
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule
  ],
})
export class IeModule {}
