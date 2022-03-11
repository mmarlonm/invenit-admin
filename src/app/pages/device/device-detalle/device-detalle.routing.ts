import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//componentInstance
import { DeviceDetalleComponent } from  './device-detalle.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: DeviceDetalleComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
