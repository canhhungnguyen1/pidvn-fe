import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VrRoutingModule } from './vr-routing.module';
import { VrComponent } from './vr.component';


@NgModule({
  declarations: [
    VrComponent
  ],
  imports: [
    CommonModule,
    VrRoutingModule
  ]
})
export class VrModule { }
