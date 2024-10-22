import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IqcMenuComponent } from './iqc-menu/iqc-menu.component';
import { IqcRequestComponent } from './iqc-request/iqc-request.component';

const routes: Routes = [
  {
    path: 'menu',
    component: IqcMenuComponent
  },
  {
    path: 'requests', 
    component: IqcRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IqcRoutingModule { }
