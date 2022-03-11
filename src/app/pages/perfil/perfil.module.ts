import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import {MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule} from '@angular/material';

import { Perfil } from './perfil.component';
import { routing }       from './perfil.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule
  ],
  declarations: [
    Perfil
  ]
})
export class PerfilModule {}
