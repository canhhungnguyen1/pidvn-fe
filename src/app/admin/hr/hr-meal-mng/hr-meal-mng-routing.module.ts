import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrMealMngComponent } from './hr-meal-mng.component';
import { HrMealMenuComponent } from './hr-meal-menu/hr-meal-menu.component';
import { HrMealSummaryComponent } from './hr-meal-summary/hr-meal-summary.component';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
  {
    path: 'menu',
    component: HrMealMenuComponent,
  },
  {
    path: 'summary',
    component: HrMealSummaryComponent,
    canActivate: [RoleGuard],
    data: {
      roles: ['super_admin', 'HR-GA member'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrMealMngRoutingModule {}
