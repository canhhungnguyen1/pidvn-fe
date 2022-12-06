import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { PermissionComponent } from './permission/permission.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      { path: 'users', component: UserComponent },
      { path: 'roles', component: RoleComponent },
      { path: 'permissions', component: PermissionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
