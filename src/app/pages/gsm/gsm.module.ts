import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';


import { GsmComponent } from './gsm.component'
import { routing } from  './gsm.routing';

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
    GsmComponent
  ]
})
export class GsmModule { }
