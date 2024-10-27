import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IqcMenuComponent } from './iqc-menu/iqc-menu.component';
import { IqcRequestComponent } from './iqc-request/iqc-request.component';
import { IqcRequestDetailComponent } from './iqc-request-detail/iqc-request-detail.component';
import { IqcRecheckComponent } from './iqc-recheck/iqc-recheck.component';

const routes: Routes = [
  {
    path: 'menu',
    component: IqcMenuComponent
  },
  {
    path: 'requests', 
    component: IqcRequestComponent
  },
  {
    path: 'request/:requestNo',
    component: IqcRequestDetailComponent
  },
  {
    path: 're-check',
    component: IqcRecheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IqcRoutingModule { }
