import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule,MatTabsModule} from '@angular/material';

import { Usuarios } from './usuarios.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    Usuarios
  ]
})
export class UsuariosModule {}
