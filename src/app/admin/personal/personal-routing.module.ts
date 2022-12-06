import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';
import { PersonalComponent } from './personal.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { UserFileComponent } from './user-file/user-file.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserTmsComponent } from './user-tms/user-tms.component';
import { UserUniformComponent } from './user-uniform/user-uniform.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent,
    children: [
      {
        path: 'menu',
        component: PersonalMenuComponent
      },
      {
        path: 'information',
        component: UserInfoComponent 
      },
      {
        path: 'files',
        component: UserFileComponent
      },
      {
        path: 'course',
        component: UserCourseComponent
      },
      {
        path: 'uniform',
        component: UserUniformComponent
      },
      {
        path: 'tms',
        component: UserTmsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
