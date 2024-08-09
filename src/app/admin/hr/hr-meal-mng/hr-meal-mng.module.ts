import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxFileUploaderModule,
  DxFormModule,
  DxTooltipModule,
} from 'devextreme-angular';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HrMealMngRoutingModule } from './hr-meal-mng-routing.module';
import { HrMealMngComponent } from './hr-meal-mng.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { HrMealMenuComponent } from './hr-meal-menu/hr-meal-menu.component';
import { HrMealSummaryComponent } from './hr-meal-summary/hr-meal-summary.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HrMealTimesheetConfirmComponent } from './hr-meal-timesheet-confirm/hr-meal-timesheet-confirm.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [HrMealMngComponent, HrMealMenuComponent, HrMealSummaryComponent, HrMealTimesheetConfirmComponent],
  imports: [
    CommonModule,
    HrMealMngRoutingModule,
    FormsModule,
    DxButtonModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxFileUploaderModule,
    DxFormModule,
    DxTooltipModule,
    NzCollapseModule,
    NzGridModule,
    NzDatePickerModule,
    NzButtonModule,
    NzTabsModule,
    NzModalModule,
    NzSpaceModule,
    NzToolTipModule
  ],
})
export class HrMealMngModule {}
