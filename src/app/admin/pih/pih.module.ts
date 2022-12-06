import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PihRoutingModule } from './pih-routing.module';
import { PihComponent } from './pih.component';


@NgModule({
  declarations: [
    PihComponent
  ],
  imports: [
    CommonModule,
    PihRoutingModule
  ]
})
export class PihModule { }
