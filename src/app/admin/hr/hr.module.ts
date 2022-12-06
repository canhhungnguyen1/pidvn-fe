import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HrRoutingModule } from './hr-routing.module';
import { HrComponent } from './hr.component';


@NgModule({
  declarations: [
    HrComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HrRoutingModule
  ]
})
export class HrModule { }
