import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IeDcMenuComponent } from './ie-dc-menu/ie-dc-menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: IeDcMenuComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawingControlRoutingModule { }
