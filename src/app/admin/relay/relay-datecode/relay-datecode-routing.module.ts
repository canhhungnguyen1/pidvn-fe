import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelayDatecodeComponent } from './relay-datecode.component';

const routes: Routes = [
  {
    path: '',
    component: RelayDatecodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelayDatecodeRoutingModule {}
