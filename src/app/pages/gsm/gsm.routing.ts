import { Routes, RouterModule }  from '@angular/router';

import { GsmComponent} from './gsm.component';
import { ModuleWithProviders } from '@angular/core';

//componentInstance

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: GsmComponent,
    children: [
      //{ path: 'usuarios', component: Usuarios }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
