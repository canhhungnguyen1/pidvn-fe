import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsliMenuComponent } from './psli-menu/psli-menu.component';
import { PsliInputComponent } from './psli-input/psli-input.component';
import { PsliUserAreaComponent } from './psli-user-area/psli-user-area.component';

const routes: Routes = [
  {
    path:'menu',
    component: PsliMenuComponent
  },
  {
    path: 'input',
    component: PsliInputComponent
  },
  {
    path: 'user-area',
    component: PsliUserAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PihStopLineInputRoutingModule { }
