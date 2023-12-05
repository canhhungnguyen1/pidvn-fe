import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrMealMngComponent } from './hr-meal-mng.component';
import { HrMealMenuComponent } from './hr-meal-menu/hr-meal-menu.component';
import { HrMealSummaryComponent } from './hr-meal-summary/hr-meal-summary.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { HrMealTimesheetConfirmComponent } from './hr-meal-timesheet-confirm/hr-meal-timesheet-confirm.component';

const routes: Routes = [
  {
    path: 'menu',
    component: HrMealMenuComponent,
  },
  {
    path: 'time-sheet-confirm',
    component: HrMealTimesheetConfirmComponent
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
