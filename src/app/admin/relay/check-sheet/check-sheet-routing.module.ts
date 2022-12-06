import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckSheetItemComponent } from './check-sheet-item/check-sheet-item.component';
import { CheckSheetLineComponent } from './check-sheet-line/check-sheet-line.component';
import { CheckSheetMainComponent } from './check-sheet-main/check-sheet-main.component';
import { CheckSheetMasterComponent } from './check-sheet-master/check-sheet-master.component';
import { CheckSheetProcessComponent } from './check-sheet-process/check-sheet-process.component';

const routes: Routes = [
  {
    path: 'main',
    component: CheckSheetMainComponent,
  },
  {
    path: 'master',
    component: CheckSheetMasterComponent,
  },
  {
    path: 'line',
    component: CheckSheetLineComponent
  },
  {
    path: 'process',
    component: CheckSheetProcessComponent
  },
  {
    path: 'item',
    component: CheckSheetItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckSheetRoutingModule {}
