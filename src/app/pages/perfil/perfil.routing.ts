import { Routes, RouterModule }  from '@angular/router';

import { Perfil} from './perfil.component';
import { ModuleWithProviders } from '@angular/core';

//componentInstance

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Perfil,
    children: [
      //{ path: 'usuarios', component: Usuarios }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
