import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as socketIOClient from 'socket.io-client';
import * as sailsIOClient from 'sails.io.js';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RootService {
  io = sailsIOClient(socketIOClient);
  constructor(public jwtHelper: JwtHelperService){
    console.log("root service");
    this.io.sails.autoConnect = false;
  }
  // Observable loggedIn source
  private _loggedInSource = new BehaviorSubject<boolean>(false);
  private _onlineSource = new BehaviorSubject<boolean>(false);
  // Observable loggedIn stream
  loggedIn$ = this._loggedInSource.asObservable();
  online$ = this._onlineSource.asObservable();
  // service command
  changeLoggedIn(valor) {
    console.log('Logged In', valor);
    this._loggedInSource.next(valor);
  }

  changeOnline(valor) {
    console.log('Online', valor);
    this._onlineSource.next(valor);
  }

  isAuthenticated(): boolean {
    if (!localStorage.token) {
        return false;
    }
    const token = localStorage.token;
    return !this.jwtHelper.isTokenExpired(token);
  }

  conectarSocket() {
    console.log(environment.apiUrl);
    this.io.socket = this.io.sails.connect(environment.apiUrl, { headers: { 'x-token': localStorage.token } });
    this.io.sails.headers = { 'x-token': localStorage.token };
    this.io.socket.get('/me', (body, JWR) => {
      console.log('Sails responded with: ', body);
      console.log('with headers: ', JWR.headers);
      console.log('and with status code: ', JWR.statusCode);
    });
  }

  public localeText = {
    // for filter panel
    page: 'Página',
    more: 'Más',
    to: 'a',
    of: 'de',
    next: 'siguiente',
    last: 'último',
    first: 'primero',
    previous: 'anterior',
    loadingOoo: 'Cargando...',

    // for set filter
    selectAll: 'Seleccionar todos',
    searchOoo: 'Buscar...',
    blanks: 'en blanco',

    // for number filter and text filter
    filterOoo: 'Filtro...',
    applyFilter: 'Aplicar filtro...',

    // for number filter
    equals: 'Igual',
    notEqual: 'Diferente',
    lessThan: 'Menor a',
    greaterThan: 'Mayor a',

    // for text filter
    contains: 'Contiene',
    notContains: 'No Contiene',
    startsWith: 'Inicia con',
    endsWith: 'Termina con',

    // the header of the default group column
    group: 'Grupo',

    // tool panel
    columns: 'Columnas',
    rowGroupColumns: 'Columnas pivote',
    rowGroupColumnsEmptyMessage: 'Arrastre columnas para agrupar',
    valueColumns: 'laValue Cols',
    pivotMode: 'Modo Pivote',
    groups: 'Grupos',
    values: 'Valores',
    pivots: 'Pivotes',
    valueColumnsEmptyMessage: 'Arrastre columnas para agrupar',
    pivotColumnsEmptyMessage: 'Arrastre aquí para hacer pivote',
    toolPanelButton: 'Herramientas',

    // other
    noRowsToShow: 'Sin Registros',

    // enterprise menu
    pinColumn: 'Fijar Columna',
    valueAggregation: 'Valor agrupado',
    autosizeThiscolumn: 'Tamaño automático',
    autosizeAllColumns: 'Tamaño automático para todas',
    groupBy: 'Agrupar por',
    ungroupBy: 'Desagrupar por',
    resetColumns: 'Resetear columnas',
    expandAll: 'Expandir',
    collapseAll: 'Cerrar',
    toolPanel: 'Herramientas',
    export: 'Exportar',
    csvExport: 'Exportar CSV',
    excelExport: 'Exportar Excel',

    // enterprise menu pinning
    pinLeft: 'laPin <<',
    pinRight: 'laPin >>',
    noPin: 'laDontPin <>',

    // enterprise menu aggregation and status panel
    sum: 'Suma',
    min: 'Min',
    max: 'Max',
    none: 'Ninguno',
    count: 'Contar',
    average: 'Promedio',

    // standard menu
    copy: 'Copiar',
    copyWithHeaders: 'Copiar con cabeceras',
    ctrlC: 'ctrl + C',
    paste: 'Pegar',
    ctrlV: 'ctrl + V'
    }

}
