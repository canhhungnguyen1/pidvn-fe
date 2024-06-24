import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawingControlRoutingModule } from './drawing-control-routing.module';
import { DrawingControlComponent } from './drawing-control.component';
import { IeDcMenuComponent } from './ie-dc-menu/ie-dc-menu.component';
import { IeDcProjectComponent } from './ie-dc-project/ie-dc-project.component';


@NgModule({
  declarations: [
    DrawingControlComponent,
    IeDcMenuComponent,
    IeDcProjectComponent
  ],
  imports: [
    CommonModule,
    DrawingControlRoutingModule
  ]
})
export class DrawingControlModule { }
