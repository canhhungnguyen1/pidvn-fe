import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WasteDataManagementComponent } from './waste-data-management/waste-data-management.component';
import { WasteDetailDataComponent } from './waste-detail-data/waste-detail-data.component';
import { WasteMainComponent } from './waste-main/waste-main.component';
import { WasteMasterDataComponent } from './waste-master-data/waste-master-data.component';
import { WasteMngComponent } from './waste-mng.component';

const routes: Routes = [
  {
    path: '',
    component: WasteMngComponent,
    children: [
      {
        path: 'main',
        component: WasteMainComponent
      },
      {
        path: 'master',
        component: WasteMasterDataComponent
      },
      {
        path: 'master/:id',
        component: WasteDetailDataComponent
      },
      {
        path:'data-management',
        component: WasteDataManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WasteMngRoutingModule { }
