import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AgGridModule } from 'ag-grid-angular/main';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatFormFieldModule,MatTabsModule,MatCardModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
//services
import { RootService } from './root.service';
import { LoginService } from './login/login.service';
import { MessageService } from './message.service';
import { UsuariosService } from './administracion/components/usuarios/usuarios.service';
import { PerfilService } from './perfil/perfil.service';
import { GruposService } from './administracion/components/grupos/grupos.service';
import { PermisosService } from './permisos/permisos.service';
import { ModelosService } from './modelos/modelos.service';
import { TrackerService } from './tracker/tracker.service'
import { GsmService } from './gsm/gsm.service'
import { DeviceService } from  './device/device.service'
import { DashboardService } from './dashboard/dashboard.service'


//grid opcion
import { ListOptionsComponent } from './list-options/list-options.component';
import { TimestampParserComponent } from './timestamp-parser/timestamp-parser.component';

import { Pages } from './pages.component';


//map import

import { AgmCoreModule } from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
//import direction
import { AgmDirectionModule } from 'agm-direction';

import { HttpConfigInterceptor } from './/token.interceptor'

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    FlexLayoutModule,
    MatExpansionModule,
    routing,
    FormsModule,
    BrowserModule,
    MatCardModule,
    AgGridModule.withComponents([TimestampParserComponent, ListOptionsComponent]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAisv7m-DGloI8luPBX5p1hh1p9O1RRz1U'
    }),
    AgmDirectionModule
  ],
  exports : [MatButtonModule, MatTabsModule, MatDialogModule],
  declarations: [
    Pages,
    ListOptionsComponent,
    TimestampParserComponent,
    //Permisos,
    //Modelos
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    RootService,
    LoginService,
    MessageService,
    UsuariosService,
    PerfilService,
    GruposService,
    PermisosService,
    ModelosService,
    TrackerService,
    GsmService,
    DeviceService,
    DashboardService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true  }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA ]
})
export class PagesModule {
}
