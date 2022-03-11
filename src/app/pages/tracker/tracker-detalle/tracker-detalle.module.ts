import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular/main';
import { NgaModule } from '../../../theme/nga.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule,MatTabsModule} from '@angular/material';

import { TrackerDetalleComponent } from './tracker-detalle.component'
import { routing }       from './tracker-detalle.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    AgGridModule.withComponents([]),
    NgaModule,
    MatInputModule
  ],
  declarations: [
    TrackerDetalleComponent
  ]
})
export class TrackerDetalleModule {}
