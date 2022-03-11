import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//componentInstance
import { TrackerDetalleComponent } from  './tracker-detalle.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TrackerDetalleComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
