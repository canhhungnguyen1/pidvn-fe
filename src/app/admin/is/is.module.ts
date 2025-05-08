import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDateRangeBoxModule,
  DxDropDownBoxModule,
  DxFormModule,
  DxHtmlEditorModule,
  DxMapModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { IsRoutingModule } from './is-routing.module';
import { IsComponent } from './is.component';
import { LoggerComponent } from './logger/logger.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IsDeviceMngComponent } from './is-device-mng/is-device-mng.component';

@NgModule({
  declarations: [IsComponent, LoggerComponent, IsDeviceMngComponent],
  imports: [
    CommonModule,
    IsRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxDateRangeBoxModule,
    DxDropDownBoxModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxMapModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    NzIconModule
  ],
})
export class IsModule {}
