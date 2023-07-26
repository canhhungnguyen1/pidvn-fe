import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrMealMngComponent } from './hr-meal-mng.component';

const routes: Routes = [
  {
    path:'menu',
    component: HrMealMngComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrMealMngRoutingModule { }
