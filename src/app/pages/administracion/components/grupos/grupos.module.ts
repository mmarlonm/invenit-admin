import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {MatButtonModule} from '@angular/material/button';
import {MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule,MatTabsModule} from '@angular/material';
import { Grupos } from './grupos.component';

@NgModule({
  imports: [
    CommonModule,,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule
  ],
  declarations: [
    Grupos
  ]
})
export class GruposModule {}
