import { NgModule, ApplicationRef,ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './pages/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AgGridModule } from 'ag-grid-angular';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';
import { CustomOption } from './custom-option';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

//services
import { RootService } from './pages/root.service';
import { LoginService } from './pages/login/login.service';
import { MessageService } from './pages/message.service';
import { UsuariosService } from './pages/administracion/components/usuarios/usuarios.service';
import { PerfilService } from './pages/perfil/perfil.service';
import { PermisosService } from './pages/permisos/permisos.service';
import { ModelosService } from './pages/modelos/modelos.service';
import { TrackerService } from './pages/tracker/tracker.service'
import { DeviceService } from './pages/device/device.service'
//import layer
//import maps
import { AgmCoreModule } from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core';

import { AgmDirectionModule } from 'agm-direction'; 

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  RootService,
  AuthGuard,
  LoginService,
  MessageService,
  UsuariosService,
  PerfilService,
  PermisosService,
  ModelosService,
  CustomOption,
  TrackerService,
  DeviceService
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */

 export function tokenGetter() {
   return localStorage.token;
 }

@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:1337'],
        blacklistedRoutes: ['localhost:1337/login'],
        headerName: 'x-token',
        authScheme: ''
      }
    }),
    PagesModule,
    routing,
    MatTabsModule,
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAisv7m-DGloI8luPBX5p1hh1p9O1RRz1U',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    GoogleMapsAPIWrapper
  ],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
