import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//componentInstance
import { GsmDetalleComponent } from  './gsm-detalle.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: GsmDetalleComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
