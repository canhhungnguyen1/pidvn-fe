import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsLPMenuComponent } from './cs-l-p-menu/cs-l-p-menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: CsLPMenuComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckSheetLineProcessRoutingModule { }
