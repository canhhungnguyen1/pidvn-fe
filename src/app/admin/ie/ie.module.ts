import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IeRoutingModule } from './ie-routing.module';
import { IeComponent } from './ie.component';


@NgModule({
  declarations: [
    IeComponent
  ],
  imports: [
    CommonModule,
    IeRoutingModule
  ]
})
export class IeModule { }
