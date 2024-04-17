import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelayDefectRecordRoutingModule } from './relay-defect-record-routing.module';
import { RelayDefectRecordComponent } from './relay-defect-record.component';
import { RelayDfMenuComponent } from './relay-df-menu/relay-df-menu.component';


@NgModule({
  declarations: [
    RelayDefectRecordComponent,
    RelayDfMenuComponent
  ],
  imports: [
    CommonModule,
    RelayDefectRecordRoutingModule
  ]
})
export class RelayDefectRecordModule { }
