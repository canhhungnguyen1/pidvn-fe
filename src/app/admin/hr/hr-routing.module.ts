import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './hr.component';

const routes: Routes = [
    {
      path: '',
      component: HrComponent,
      children: [
        {
          path: 'hr-emp-mng',
          loadChildren: () => import('./hr-emp-mng/hr-emp-mng.module').then(m => m.HrEmpMngModule)
        },
        {
          path: 'waste-mng',
          loadChildren: () => import('./waste-mng/waste-mng.module').then(m => m.WasteMngModule)
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
