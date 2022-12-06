import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsComponent } from './is.component';
import { IsRoutingModule } from './is-routing.module';



@NgModule({
  declarations: [
    IsComponent
  ],
  imports: [
    CommonModule,
    IsRoutingModule
  ]
})
export class IsModule { }
