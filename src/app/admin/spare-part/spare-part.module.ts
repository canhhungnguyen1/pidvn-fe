import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparePartRoutingModule } from './spare-part-routing.module';
import { SparePartComponent } from './spare-part.component';
import { SparePartMenuComponent } from './spare-part-menu/spare-part-menu.component';


@NgModule({
  declarations: [
    SparePartComponent,
    SparePartMenuComponent
  ],
  imports: [
    CommonModule,
    SparePartRoutingModule
  ]
})
export class SparePartModule { }
