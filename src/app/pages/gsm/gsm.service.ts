import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Gsm } from './../types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './../message.service';
import * as _ from 'lodash';
@Injectable()
export class GsmService {

  private gsmurl = environment.apiUrl + '/gsm';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  list(params?: any): Observable<Gsm[]> {
    let url = `${this.gsmurl}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Gsm[]>(url)
    .pipe(
      tap(gsm => this.log(`lista de gsm`)),
      catchError(this.handleError('GsmService.list', []))
    );
  }

  save(gsm: Gsm): Observable<Gsm> {
    const url = `${this.gsmurl}`;
    return this.http.post<Gsm>(url, gsm)
      .pipe(
        tap((gsm: Gsm) => this.log(`Gsm guardado id=${gsm.id}`)),
        catchError(this.handleError<Gsm>('GsmService.save'))
      );
  }

  get(id: string, params?: any): Observable<Gsm> {
    let url = `${this.gsmurl}/${id}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Gsm>(url)
    .pipe(
      tap(_ => this.log(`get Gsm id=${id}`)),
      catchError(this.handleError<Gsm>(`GsmService.get id=${id}`))
    );
  }

  update(gsm: Gsm): Observable<Gsm> {
    const url = `${this.gsmurl}/${gsm.id}`;
    let registro = _.omit(gsm, ['usuarioCreacion', 'propietario', 'group']);
    return this.http.patch<Gsm>(url, registro)
      .pipe(
        tap((gsm: Gsm) => this.log(`Gsm actualizdo id=${gsm.id}`)),
        catchError(this.handleError<Gsm>('GsmService.update'))
      );
  }


  delete(id: string): Observable<Gsm> {
    const url = `${this.gsmurl}/${id}`;
    return this.http.delete<Gsm>(url)
      .pipe(
        tap((gsm: Gsm) => this.log(`Gsm eliminada id=${gsm.id}`)),
        catchError(this.handleError<Gsm>('GsmService.delete'))
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
    this.messageService.add('UsuariosService: ' + message);
  }
}
