import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { AdminComponent } from './admin.component';
import { BalanceSheetComponent } from './purchase-datas/balance-sheet/balance-sheet.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'administrator',
        loadChildren: () =>
          import('./administrator/administrator.module').then(
            (m) => m.AdministratorModule
          ),
        canActivate: [RoleGuard],
        data: {
          roles: ['super_admin', 'is_basic', 'IS_advance'],
        },
      },
      {
        path: 'personal',
        loadChildren: () =>
          import('./personal/personal.module').then((m) => m.PersonalModule),
      },
      {
        path: 'is',
        loadChildren: () => import('./is/is.module').then((m) => m.IsModule),
        canActivate: [RoleGuard],
        data: {
          roles: ['super_admin', 'is_basic', 'IS_advance'],
        },
      },
      {
        path: 'qa',
        loadChildren: () => import('./qa/qa.module').then((m) => m.QaModule),
        canActivate: [RoleGuard],
        data: {
          roles: ['super_admin', 'PIH QA-IQC'],
        },
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./sales/sales.module').then((m) => m.SalesModule),
          canActivate: []
      },
      {
        path: 'warehouse',
        loadChildren: () =>
          import('./warehouse/warehouse.module').then((m) => m.WarehouseModule),
        canActivate: [RoleGuard],
        data: {
          roles: ['super_admin', 'Pur WH 1'],
        },
      },
      {
        path: 'relay',
        loadChildren: () =>
          import('./relay/relay.module').then((m) => m.RelayModule),
        canActivate: [],
      },
      {
        path: 'hr',
        loadChildren: () => import('./hr/hr.module').then((m) => m.HrModule),
        canActivate: [],
      },
      {
        path: 'pih',
        loadChildren: () => import('./pih/pih.module').then(m => m.PihModule),
        canActivate: [RoleGuard],
        data: {
          roles: ['super_admin', 'PIH MA Basic'],
        }
      },
      {
        // path:'balance-sheet' , component:BalanceSheetComponent
        path: 'purchase-datas',
        loadChildren: () => import('./purchase-datas/purchase-datas.module').then(m => m.PurchaseDatasModule),
        canActivate: [],
        // data: {
        //   roles: ['super_admin', 'PIH MA Basic'],
        // }
      },
      {
        path: 'packing',
        loadChildren: () => import('./packing/packing.module').then(m => m.PackingModule)
      },
      {
        path: 'accounting',
        loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule)
      },
      {
        path: 'pe',
        loadChildren: () => import('./pe/pe.module').then(m => m.PeModule)
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [],
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, NzModalModule],
})
export class AdminRoutingModule {}
