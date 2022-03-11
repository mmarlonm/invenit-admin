
import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes
// export function loadChildren(path) { return System.import(path); };
export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'editors', loadChildren: 'app/pages/editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: 'app/pages/components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule' },
      { path: 'administracion', loadChildren: 'app/pages/administracion/administracion.module#AdministracionModule' },
      { path: 'perfil/:id', loadChildren: 'app/pages/perfil/perfil.module#PerfilModule' },
      { path: 'tracker', loadChildren: 'app/pages/tracker/tracker.module#TrackerModule' },
      { path: 'tracker/:id', loadChildren: 'app/pages/tracker/tracker-detalle/tracker-detalle.module#TrackerDetalleModule' },
      { path: 'gsm', loadChildren: 'app/pages/gsm/gsm.module#GsmModule' },
      { path: 'gsm/:id', loadChildren: 'app/pages/gsm/gsm-detalle/gsm-detalle.module#GsmDetalleModule' },
      { path: 'device', loadChildren: 'app/pages/device/device.module#DeviceModule' },
      { path: 'device/:id', loadChildren: 'app/pages/device/device-detalle/device-detalle.module#DeviceDetalleModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
