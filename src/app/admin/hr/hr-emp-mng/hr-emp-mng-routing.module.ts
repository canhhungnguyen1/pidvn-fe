import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrEmpFileComponent } from './hr-emp-file/hr-emp-file.component';
import { HrEmpMngMenuComponent } from './hr-emp-mng-menu/hr-emp-mng-menu.component';
import { HrEmpUniformComponent } from './hr-emp-uniform/hr-emp-uniform.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {
    path:'menu',
    component: HrEmpMngMenuComponent
  },
  {
    path: 'file',
    component: HrEmpFileComponent
  },
  {
    path: 'uniform',
    component: HrEmpUniformComponent
  },
  {
    path: 'course',
    loadChildren: () => import('./hr-emp-course/hr-emp-course.module').then(m => m.HrEmpCourseModule)
  },
  {
    path: 'user-info',
    component: UserInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrEmpMngRoutingModule { }
