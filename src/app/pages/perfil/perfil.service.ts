import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import * as _ from 'lodash';

@Injectable()
export class PerfilService {
  private userUrl = environment.apiUrl + '/user';  // URL to web api
  private logoutUrl = environment.apiUrl + '/logout';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  list(params?: any): Observable<User[]> {
    let url = `${this.userUrl}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<User[]>(url)
    .pipe(
      tap(usuarios => this.log(`lista de usuarios`)),
      catchError(this.handleError('PerfilService.list', []))
    );
  }

  update(user: User): Observable<User> {
    const url = `${this.userUrl}/${user.id}`;
    let registro : Partial<User> = _.omit(user, ['usuarioCreacion', 'propietario']);
    if (_.isObject(registro.group)) {
        registro.group = registro.group.id;
    }
    return this.http.patch<User>(url, registro)
      .pipe(
        tap((usuario: User) => this.log(`Usuario actualizdo id=${usuario.id}`)),
        catchError(this.handleError<User>('PerfilService.update'))
      );
  }

  get(id: string, params?: any): Observable<User> {
    let url = `${this.userUrl}/${id}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    console.log(url);
    return this.http.get<User>(url)
    .pipe(
      tap(_ => this.log(`get Usuario id=${id}`)),
      catchError(this.handleError<User>(`PerfilService.get id=${id}`))
    );
  }

  /*save(user: User): Observable<User> {
    const url = `${this.userUrl}`;
    return this.http.post<User>(url, user)
      .pipe(
        tap((usuario: User) => this.log(`Usuario guardado id=${usuario.id}`)),
        catchError(this.handleError<User>('UsuariosService.save'))
      );
  }*/

  /*delete(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<User>(url)
      .pipe(
        tap((usuario: User) => this.log(`Usuario eliminado id=${usuario.id}`)),
        catchError(this.handleError<User>('UsuariosService.delete'))
      );
  }*/

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
    this.messageService.add('UsuariosService: ' + message);
  }

}
