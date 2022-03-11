import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { AgGridModule } from 'ag-grid-angular/main';
import {MatTabsModule} from '@angular/material/tabs';

import { Administracion } from './administracion.component';
import { routing }       from './administracion.routing';
import { Usuarios } from './components/usuarios/usuarios.component';
import { Grupos } from './components/grupos/grupos.component';
import { GrupoDetalleComponent } from './components/grupos/grupos-detalle/grupo-detalle.component';
import { UsuarioDetalleComponent } from './components/usuarios/usuarios-detalle/usuarios-detalle.component';

import { ListOptionsComponent } from './../list-options/list-options.component';
import { TimestampParserComponent } from './../timestamp-parser/timestamp-parser.component';
import {MatExpansionModule} from '@angular/material/expansion';

import { Modelos } from './../modelos/modelos.component';
import { Permisos } from './../permisos/permisos.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    MatTabsModule,
    MatExpansionModule,
    AgGridModule.withComponents([]),
    routing
  ],
  declarations: [
    Administracion,
    Usuarios,
    Grupos,
    GrupoDetalleComponent,
    UsuarioDetalleComponent,
    //ListOptionsComponent,
    //TimestampParserComponent,
    Modelos,
    Permisos
  ],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AdministracionModule {}
