import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular/main';
import { NgaModule } from '../../../theme/nga.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule,MatTabsModule} from '@angular/material';

import { GsmDetalleComponent } from './gsm-detalle.component'
import { routing } from './gsm-detalle.routing'


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GsmDetalleComponent
  ]
})
export class GsmDetalleModule { }
