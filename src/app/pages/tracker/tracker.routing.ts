import { Routes, RouterModule }  from '@angular/router';

import { TrackerComponent} from './tracker.component';
import { ModuleWithProviders } from '@angular/core';

//componentInstance

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TrackerComponent,
    children: [
      //{ path: 'usuarios', component: Usuarios }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
