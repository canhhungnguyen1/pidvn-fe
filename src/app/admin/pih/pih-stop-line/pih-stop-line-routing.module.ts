import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PihStopLineMainComponent } from './pih-stop-line-main/pih-stop-line-main.component';

const routes: Routes = [
  {
    path: 'main',
    component: PihStopLineMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PihStopLineRoutingModule { }
