import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-management.component';
import { PmMenuComponent } from './pm-menu/pm-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectManagementComponent,
    children: [
      {
        path: 'menu',
        component: PmMenuComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
