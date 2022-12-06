import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorComponent } from './administrator.component';
import { UserComponent } from './user/user.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { PermissionComponent } from './permission/permission.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from './role/role.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [AdministratorComponent, UserComponent, PermissionComponent, RoleComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzGridModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzToolTipModule,
    NzSelectModule
  ],
})
export class AdministratorModule {}
