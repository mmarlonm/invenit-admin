import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GeoPoint, Device, Tracker } from './../types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './../message.service';
import * as _ from 'lodash';

@Injectable()
export class DashboardService {
  private geourl = environment.apiUrl + '/geopoints';  // URL to web api
  private deviceurl = environment.apiUrl + '/device';  // URL to web api
  private trackerurl = environment.apiUrl + '/tracker';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  list(params?: any): Observable<GeoPoint[]> {
    let url = `${this.geourl}?`;
    console.log(url);
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<GeoPoint[]>(url)
    .pipe(
      tap(geopoint => this.log(`lista de GeoPoint`)),
      catchError(this.handleError('DashboardService.list', []))
    );
  }

  listDevice(params?: any): Observable<Device[]> {
    let url = `${this.deviceurl}?`;
    console.log(url);
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Device[]>(url)
    .pipe(
      tap(geopoint => this.log(`lista de GeoPoint`)),
      catchError(this.handleError('DashboardService.list', []))
    );
  }

  get(id: string, params?: any): Observable<GeoPoint> {
    let url = `${this.geourl}?dispositivo=${id}`;
    console.log(url);
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<GeoPoint>(url)
    .pipe(
      tap(_ => this.log(`get Gsm id=${id}`)),
      catchError(this.handleError<GeoPoint>(`GsmService.get id=${id}`))
    );
  }

  getTracker(id: string, params?: any): Observable<Tracker> {
    let url = `${this.trackerurl}?device=${id}`;
    console.log(url);
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Tracker>(url)
    .pipe(
      tap(_ => this.log(`get Tracker id=${id}`)),
      catchError(this.handleError<Tracker>(`GsmService.get id=${id}`))
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
