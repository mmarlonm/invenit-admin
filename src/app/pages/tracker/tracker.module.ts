import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';
import {MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule,MatTabsModule} from '@angular/material';
import { TrackerComponent } from './tracker.component';
import { routing } from './tracker.routing';

//import map
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
    TrackerComponent,
  ]
})
export class TrackerModule { }
