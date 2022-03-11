import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';


import { DeviceComponent } from  './device.component'
import { routing } from './device.routing';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([]),
    NgaModule
  ],
  declarations: [
    DeviceComponent
  ]
})
export class DeviceModule { }
