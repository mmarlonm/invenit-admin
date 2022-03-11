import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import * as _ from 'lodash';

@Injectable()
export class PermisosService {
  private permissionUrl = environment.apiUrl + '/permission';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  list(params?: any): Observable<Permission[]> {
    let url = `${this.permissionUrl}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Permission[]>(url)
    .pipe(
      tap(permisos => this.log(`lista de permisos`)),
      catchError(this.handleError('PermisosService.list', []))
    );
  }

  update(permission: Permission): Observable<Permission> {
    const url = `${this.permissionUrl}/${permission.id}`;
    let registro = _.omit(permission, ['usuarioCreacion', 'propietario', 'permission']);
    return this.http.patch<Permission>(url, registro)
      .pipe(
        tap((grupo: Permission) => this.log(`Permiso actualizdo id=${grupo.id}`)),
        catchError(this.handleError<Permission>('PermisosService.update'))
      );
  }

  get(id: string, params?: any): Observable<Permission> {
    let url = `${this.permissionUrl}/${id}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Permission>(url)
    .pipe(
      tap(_ => this.log(`get Permiso id=${id}`)),
      catchError(this.handleError<Permission>(`PermisosService.get id=${id}`))
    );
  }

  save(permission: Permission): Observable<Permission> {
    const url = `${this.permissionUrl}`;
    return this.http.post<Permission>(url, permission)
      .pipe(
        tap((permiso: Permission) => this.log(`Permiso guardado id=${permiso.id}`)),
        catchError(this.handleError<Permission>('PermisosService.save'))
      );
  }

  delete(id: string): Observable<Permission> {
    const url = `${this.permissionUrl}/${id}`;
    return this.http.delete<Permission>(url)
      .pipe(
        tap((permiso: Permission) => this.log(`Permiso eliminado id=${permiso.id}`)),
        catchError(this.handleError<Permission>('PermisosService.delete'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for permission consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
