import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './hr.component';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
    {
      path: '',
      component: HrComponent,
      children: [
        {
          path: 'hr-emp-mng',
          loadChildren: () => import('./hr-emp-mng/hr-emp-mng.module').then(m => m.HrEmpMngModule),
          canActivate: [RoleGuard],
          data: {
            roles: ['super_admin', 'HR-GA member'],
          },
        },
        {
          path: 'waste-mng',
          loadChildren: () => import('./waste-mng/waste-mng.module').then(m => m.WasteMngModule),
          canActivate: [RoleGuard],
          data: {
            roles: ['super_admin', 'HR-GA member'],
          },
        },
        {
          path: 'hr-meal-mng',
          loadChildren: () => import('./hr-meal-mng/hr-meal-mng.module').then(m => m.HrMealMngModule),
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
