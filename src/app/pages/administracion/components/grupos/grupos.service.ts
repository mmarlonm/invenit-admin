import { Injectable } from '@angular/core';

import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group } from './../../../types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './../../../message.service';
import * as _ from 'lodash';

@Injectable()
export class GruposService {
  private groupUrl = environment.apiUrl + '/group';  // URL to web api
  constructor(private http: HttpClient, private messageService: MessageService) { }

  list(params?: any): Observable<Group[]> {
    let url = `${this.groupUrl}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Group[]>(url)
    .pipe(
      tap(grupos => this.log(`lista de grupos`)),
      catchError(this.handleError('GruposService.list', []))
    );
  }

  update(group: Group): Observable<Group> {
    const url = `${this.groupUrl}/${group.id}`;
    let registro = _.omit(group, ['usuarioCreacion', 'propietario', 'usuarios', 'permissions']);
    return this.http.patch<Group>(url, registro)
      .pipe(
        tap((grupo: Group) => this.log(`Grupo actualizdo id=${grupo.id}`)),
        catchError(this.handleError<Group>('GruposService.update'))
      );
  }

  get(id: string, params?: any): Observable<Group> {
    let url = `${this.groupUrl}/${id}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Group>(url)
    .pipe(
      tap(grupo => this.log(`get Grupo id=${id}`)),
      catchError(this.handleError<Group>(`GruposService.get id=${id}`))
    );
  }

  save(group: Group): Observable<Group> {
    const url = `${this.groupUrl}`;
    return this.http.post<Group>(url, group)
      .pipe(
        tap((grupo: Group) => this.log(`Grupo guardado id=${grupo.id}`)),
        catchError(this.handleError<Group>('GruposService.save'))
      );
  }

  addUser(groupId: string, userId: string): Observable<any> {
    const url = `${this.groupUrl}/${groupId}/usuarios/add/${userId}`;
    return this.http.get<any>(url)
      .pipe(
        tap((res: any) => this.log(`Usuario guardado res=${res}`)),
        catchError(this.handleError<any>('GruposService.setGroup'))
      );
  }

  delete(id: string): Observable<Group> {
    const url = `${this.groupUrl}/${id}`;
    return this.http.delete<Group>(url)
      .pipe(
        tap((grupo: Group) => this.log(`Grupo eliminado id=${grupo.id}`)),
        catchError(this.handleError<Group>('GruposService.delete'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('GruposService: ' + message);
  }

}
