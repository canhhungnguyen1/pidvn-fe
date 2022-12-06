import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelayComponent } from './relay.component';
import { RelayRoutingModule } from './relay-routing.module';
import { MeasurementComponent } from './measurement/measurement.component';



@NgModule({
  declarations: [
    RelayComponent,
    MeasurementComponent
  ],
  imports: [
    CommonModule,
    RelayRoutingModule
  ]
})
export class RelayModule { }
