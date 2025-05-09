import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsComponent } from './is.component';
import { LoggerComponent } from './logger/logger.component';

const routes: Routes = [
  {
    path: '',
    component: IsComponent,
    children: [
      {
        path: 'logger',
        component: LoggerComponent,
      },
      {
        path: 'is-device-mng',
        loadChildren: () =>
          import('./is-device-mng/is-device-mng.module').then(
            (m) => m.IsDeviceMngModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IsRoutingModule {}
