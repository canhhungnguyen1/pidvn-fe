import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxChartModule, DxDataGridModule } from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { MeaExportType1Component } from './data-export-measurement/commons/mea-export-type1/mea-export-type1.component';
import { MeaExportType2Component } from './data-export-measurement/commons/mea-export-type2/mea-export-type2.component';
import { MeaExportType3Component } from './data-export-measurement/commons/mea-export-type3/mea-export-type3.component';
import { MeaExportType4Component } from './data-export-measurement/commons/mea-export-type4/mea-export-type4.component';
import { MeaExportType5Component } from './data-export-measurement/commons/mea-export-type5/mea-export-type5.component';
import { DataExportMeasurementComponent } from './data-export-measurement/data-export-measurement.component';
import { MeaExeCheckSheetComponent } from './execute-item-measurement/commons/mea-exe-check-sheet/mea-exe-check-sheet.component';
import { MeaExeType1Component } from './execute-item-measurement/commons/mea-exe-type1/mea-exe-type1.component';
import { MeaExeType2Component } from './execute-item-measurement/commons/mea-exe-type2/mea-exe-type2.component';
import { MeaExeType3Component } from './execute-item-measurement/commons/mea-exe-type3/mea-exe-type3.component';
import { MeaExeType4Component } from './execute-item-measurement/commons/mea-exe-type4/mea-exe-type4.component';
import { MeaExeType5Component } from './execute-item-measurement/commons/mea-exe-type5/mea-exe-type5.component';
import { ExecuteItemMeasurementComponent } from './execute-item-measurement/execute-item-measurement.component';
import { ItemsMeasurementComponent } from './items-measurement/items-measurement.component';
import { MainMeasurementComponent } from './main-measurement/main-measurement.component';
import { MeaMngType1Component } from './management-item-measurement/commons/mea-mng-type1/mea-mng-type1.component';
import { MeaMngType2Component } from './management-item-measurement/commons/mea-mng-type2/mea-mng-type2.component';
import { MeaMngType3Component } from './management-item-measurement/commons/mea-mng-type3/mea-mng-type3.component';
import { MeaMngType4Component } from './management-item-measurement/commons/mea-mng-type4/mea-mng-type4.component';
import { MeaMngType5Component } from './management-item-measurement/commons/mea-mng-type5/mea-mng-type5.component';
import { MeaMngEditType1Component } from './management-item-measurement/detail-edit/mea-mng-edit-type1/mea-mng-edit-type1.component';
import { MeaMngEditType2Component } from './management-item-measurement/detail-edit/mea-mng-edit-type2/mea-mng-edit-type2.component';
import { MeaMngEditType3Component } from './management-item-measurement/detail-edit/mea-mng-edit-type3/mea-mng-edit-type3.component';
import { MeaMngEditType4Component } from './management-item-measurement/detail-edit/mea-mng-edit-type4/mea-mng-edit-type4.component';
import { MeaMngEditType5Component } from './management-item-measurement/detail-edit/mea-mng-edit-type5/mea-mng-edit-type5.component';
import { ManagementItemMeasurementComponent } from './management-item-measurement/management-item-measurement.component';
import { MeasurementRoutingModule } from './measurement-routing.module';
import { XbarChartMeaDetailComponent } from './xbar-chart-measurement/xbar-chart-mea-detail/xbar-chart-mea-detail.component';
import { XbarChartMeaListComponent } from './xbar-chart-measurement/xbar-chart-mea-list/xbar-chart-mea-list.component';
@NgModule({
  declarations: [
    MainMeasurementComponent,
    ItemsMeasurementComponent,
    ExecuteItemMeasurementComponent,
    MeaExeType1Component,
    MeaExeType2Component,
    MeaExeType3Component,
    ManagementItemMeasurementComponent,
    MeaMngType3Component,
    MeaMngType1Component,
    MeaMngType2Component,
    MeaExeCheckSheetComponent,
    MeaMngEditType3Component,
    MeaMngEditType1Component,
    DataExportMeasurementComponent,
    MeaExportType1Component,
    MeaExportType3Component,
    MeaExeType4Component,
    MeaMngType4Component,
    MeaMngEditType4Component,
    MeaMngEditType2Component,
    MeaExportType2Component,
    MeaExportType4Component,
    XbarChartMeaListComponent,
    XbarChartMeaDetailComponent,
    MeaExeType5Component,
    MeaMngType5Component,
    MeaMngEditType5Component,
    MeaExportType5Component,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MeasurementRoutingModule,
    DxDataGridModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzGridModule,
    NzTableModule,
    NzCollapseModule,
    NzSelectModule,
    NzDividerModule,
    NzTabsModule,
    NzTagModule,
    NzSkeletonModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzImageModule,
    NzDatePickerModule,
    NzRadioModule,
    NzCardModule,
    NzCheckboxModule,
    NzPopconfirmModule,
    DxChartModule,
    NzUploadModule,
    NzMessageModule
  ],
})
export class MeasurementModule {}
