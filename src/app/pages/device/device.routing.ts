import { Routes, RouterModule }  from '@angular/router';

import { DeviceComponent} from './device.component';
import { ModuleWithProviders } from '@angular/core';

//componentInstance

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: DeviceComponent,
    children: [
      //{ path: 'usuarios', component: Usuarios }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
