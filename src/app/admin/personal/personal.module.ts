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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';
import { UserFileComponent } from './user-file/user-file.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { UserUniformComponent } from './user-uniform/user-uniform.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { UserTmsComponent } from './user-tms/user-tms.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxFileUploaderModule,
  DxFormModule,
  DxTooltipModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [
    PersonalComponent,
    UserInfoComponent,
    PersonalMenuComponent,
    UserFileComponent,
    UserCourseComponent,
    UserUniformComponent,
    UserTmsComponent,
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    FormsModule,
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
    NzTabsModule,
    NzSelectModule,
    NzMessageModule,
    NzPopoverModule,
    NzInputNumberModule,
    DxButtonModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxFileUploaderModule,
    DxFormModule,
    DxTooltipModule,
  ],
})
export class PersonalModule {}
