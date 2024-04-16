import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelayDfMenuComponent } from './relay-df-menu/relay-df-menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: RelayDfMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelayDefectRecordRoutingModule { }
