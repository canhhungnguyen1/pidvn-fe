import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataExportMeasurementComponent } from './data-export-measurement/data-export-measurement.component';
import { ExecuteItemMeasurementComponent } from './execute-item-measurement/execute-item-measurement.component';
import { ItemsMeasurementComponent } from './items-measurement/items-measurement.component';
import { MainMeasurementComponent } from './main-measurement/main-measurement.component';
import { ManagementItemMeasurementComponent } from './management-item-measurement/management-item-measurement.component';
import { MeasurementComponent } from './measurement.component';
import { XbarChartMeaDetailComponent } from './xbar-chart-measurement/xbar-chart-mea-detail/xbar-chart-mea-detail.component';
import { XbarChartMeaListComponent } from './xbar-chart-measurement/xbar-chart-mea-list/xbar-chart-mea-list.component';

const routes: Routes = [
  {
    path: '',
    component: MeasurementComponent,
    children: [
      {
        path: 'main',
        component: MainMeasurementComponent
      },
      {
        path: 'items',
        component: ItemsMeasurementComponent
      },
      {
        path: 'item-execute',
        component: ExecuteItemMeasurementComponent
      },
      {
        path: 'item-management',
        component: ManagementItemMeasurementComponent
      },
      {
        path: 'data-export',
        component: DataExportMeasurementComponent
      },
      {
        path: 'xbar-chart-list',
        component: XbarChartMeaListComponent
      },
      {
        path: 'xbar-chart-detail',
        component: XbarChartMeaDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeasurementRoutingModule { }
