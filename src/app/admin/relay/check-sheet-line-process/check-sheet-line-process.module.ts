import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckSheetLineProcessRoutingModule } from './check-sheet-line-process-routing.module';
import { CheckSheetLineProcessComponent } from './check-sheet-line-process.component';
import { CsLPMenuComponent } from './cs-l-p-menu/cs-l-p-menu.component';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [
    CheckSheetLineProcessComponent,
    CsLPMenuComponent
  ],
  imports: [
    CommonModule,
    CheckSheetLineProcessRoutingModule,
    NzGridModule
  ]
})
export class CheckSheetLineProcessModule { }
