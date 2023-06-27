import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaEquipmentLabelCreateComponent } from './qa-equipment-label-create/qa-equipment-label-create.component';
import { QaEquipmentMenuComponent } from './qa-equipment-menu/qa-equipment-menu.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { QaEquipmentListComponent } from './qa-equipment-list/qa-equipment-list.component';
import { QaEquipmentDetailComponent } from './qa-equipment-detail/qa-equipment-detail.component';
import { QaEquipmentDataComponent } from './qa-equipment-data/qa-equipment-data.component';

const routes: Routes = [
  {
    path: 'menu',
    component: QaEquipmentMenuComponent
  },
  {
    path: 'create-label',
    component: QaEquipmentLabelCreateComponent
  },
  {
    path: 'devices',
    component: QaEquipmentListComponent
  },
  {
    path: 'devices/:deviceId',
    component: QaEquipmentDetailComponent
  },
  {
    path: 'data',
    component: QaEquipmentDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, NzGridModule]
})
export class QaEquipmentMngRoutingModule { }
