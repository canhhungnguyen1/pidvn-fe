import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CheckSheetItemComponent } from './check-sheet-item/check-sheet-item.component';
import { CheckSheetLineComponent } from './check-sheet-line/check-sheet-line.component';
import { CheckSheetMainComponent } from './check-sheet-main/check-sheet-main.component';
import { CheckSheetMasterComponent } from './check-sheet-master/check-sheet-master.component';
import { CheckSheetProcessComponent } from './check-sheet-process/check-sheet-process.component';
import { CheckSheetRoutingModule } from './check-sheet-routing.module';
import { CheckSheetComponent } from './check-sheet.component';

@NgModule({
  declarations: [
    CheckSheetComponent,
    CheckSheetMainComponent,
    CheckSheetMasterComponent,
    CheckSheetLineComponent,
    CheckSheetProcessComponent,
    CheckSheetItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckSheetRoutingModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzIconModule,
    NzTableModule,
    NzCollapseModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    NzRadioModule,
    NzFormModule,
    NzToolTipModule
  ],
})
export class CheckSheetModule {}
