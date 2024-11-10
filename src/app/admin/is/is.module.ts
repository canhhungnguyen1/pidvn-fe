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

@NgModule({
  declarations: [IsComponent, LoggerComponent],
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
