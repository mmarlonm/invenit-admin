import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tracker } from './../types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './../message.service';
import * as _ from 'lodash';

@Injectable()
export class TrackerService {

  private trackerUrl = environment.apiUrl + '/tracker';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  list(params?: any): Observable<Tracker[]> {
    let url = `${this.trackerUrl}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Tracker[]>(url)
    .pipe(
      tap(tracker => this.log(`lista de trackers`)),
      catchError(this.handleError('TrackerService.list', []))
    );
  }

  save(tracker: Tracker): Observable<Tracker> {
    const url = `${this.trackerUrl}`;
    return this.http.post<Tracker>(url, tracker)
      .pipe(
        tap((tracker: Tracker) => this.log(`Almacen guardado id=${tracker.id}`)),
        catchError(this.handleError<Tracker>('AlmacenService.save'))
      );
  }

  get(id: string, params?: any): Observable<Tracker> {
    let url = `${this.trackerUrl}/${id}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Tracker>(url)
    .pipe(
      tap(_ => this.log(`get Tracker id=${id}`)),
      catchError(this.handleError<Tracker>(`TrackerService.get id=${id}`))
    );
  }

  update(tracker: Tracker): Observable<Tracker> {
    const url = `${this.trackerUrl}/${tracker.id}`;
    let registro = _.omit(tracker, ['usuarioCreacion', 'propietario', 'group']);
    return this.http.patch<Tracker>(url, registro)
      .pipe(
        tap((tracker: Tracker) => this.log(`Tracker actualizdo id=${tracker.id}`)),
        catchError(this.handleError<Tracker>('TrackerService.update'))
      );
  }

  delete(id: string): Observable<Tracker> {
    const url = `${this.trackerUrl}/${id}`;
    return this.http.delete<Tracker>(url)
      .pipe(
        tap((tracker: Tracker) => this.log(`Almacen eliminada id=${tracker.id}`)),
        catchError(this.handleError<Tracker>('AlmacenService.delete'))
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
