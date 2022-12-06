import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { HrEmpMngRoutingModule } from './hr-emp-mng-routing.module';
import { HrEmpMngComponent } from './hr-emp-mng.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { HrEmpMngMenuComponent } from './hr-emp-mng-menu/hr-emp-mng-menu.component';
import { HrEmpUniformComponent } from './hr-emp-uniform/hr-emp-uniform.component';
import { HrEmpCourseComponent } from './hr-emp-course/hr-emp-course.component';
import { DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxFileUploaderModule, DxFormModule, DxTooltipModule } from 'devextreme-angular';
import { HrEmpFileComponent } from './hr-emp-file/hr-emp-file.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';

@NgModule({
  declarations: [HrEmpMngComponent, UserInfoComponent, HrEmpMngMenuComponent, HrEmpUniformComponent, HrEmpCourseComponent, HrEmpFileComponent],
  imports: [
    CommonModule,
    HrEmpMngRoutingModule,
    FormsModule,
    DxButtonModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxFileUploaderModule,
    DxFormModule,
    DxTooltipModule,
    NgxPhotoEditorModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzGridModule,
    NzInputModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzImageModule,
    NzDividerModule,
    NzDatePickerModule,
    NzUploadModule,
    NzModalModule,
    NzPopconfirmModule,
    NzTabsModule,
    NzSelectModule,
    NzMessageModule,
    NzPopoverModule,
    NzBadgeModule,
    NzSpaceModule
  ],
})
export class HrEmpMngModule {}
