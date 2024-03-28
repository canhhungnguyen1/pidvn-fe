import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Layer2ModuleRoutingModule } from './layer2-module-routing.module';
import { Layer2ModuleComponent } from './layer2-module.component';


@NgModule({
  declarations: [
    Layer2ModuleComponent
  ],
  imports: [
    CommonModule,
    Layer2ModuleRoutingModule
  ]
})
export class Layer2ModuleModule { }
