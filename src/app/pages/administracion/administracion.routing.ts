import { Routes, RouterModule }  from '@angular/router';

import { Administracion} from './administracion.component';
import { ModuleWithProviders } from '@angular/core';

//componentInstance
import { Usuarios } from './components/usuarios/usuarios.component';
import { Grupos } from './components/grupos/grupos.component';
import { GrupoDetalleComponent } from './components/grupos/grupos-detalle/grupo-detalle.component';
import { UsuarioDetalleComponent } from './components/usuarios/usuarios-detalle/usuarios-detalle.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Administracion,
    children: [
      { path: 'usuarios', component: Usuarios },
      { path: 'grupos', component: Grupos },
      { path: 'grupos/:id', component: GrupoDetalleComponent },
      { path: 'usuarios/:id', component: UsuarioDetalleComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
