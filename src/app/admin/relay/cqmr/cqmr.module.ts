import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CqmrRoutingModule } from './cqmr-routing.module';
import { CqmrComponent } from './cqmr.component';
import { CqmrMainComponent } from './cqmr-main/cqmr-main.component';


@NgModule({
  declarations: [
    CqmrComponent,
    CqmrMainComponent
  ],
  imports: [
    CommonModule,
    CqmrRoutingModule
  ]
})
export class CqmrModule { }
