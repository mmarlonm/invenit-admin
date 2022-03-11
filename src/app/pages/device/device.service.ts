import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Device } from './../types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './../message.service';
import * as _ from 'lodash';

@Injectable()
export class DeviceService {
  
  private deviceurl = environment.apiUrl + '/device';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  list(params?: any): Observable<Device[]> {
    let url = `${this.deviceurl}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Device[]>(url)
    .pipe(
      tap(gsdevicem => this.log(`lista de device`)),
      catchError(this.handleError('GsmService.list', []))
    );
  }

  save(device: Device): Observable<Device> {
    const url = `${this.deviceurl}`;
    return this.http.post<Device>(url, device)
      .pipe(
        tap((device: Device) => this.log(`Gsm guardado id=${device.id}`)),
        catchError(this.handleError<Device>('GsmService.save'))
      );
  }

  get(id: string, params?: any): Observable<Device> {
    let url = `${this.deviceurl}/${id}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Device>(url)
    .pipe(
      tap(_ => this.log(`get Gsm id=${id}`)),
      catchError(this.handleError<Device>(`GsmService.get id=${id}`))
    );
  }

  update(device: Device): Observable<Device> {
    const url = `${this.deviceurl}/${device.id}`;
    let registro = _.omit(device, ['usuarioCreacion', 'propietario', 'group']);
    return this.http.patch<Device>(url, registro)
      .pipe(
        tap((device: Device) => this.log(`Gsm actualizdo id=${device.id}`)),
        catchError(this.handleError<Device>('GsmService.update'))
      );
  }

  delete(id: string): Observable<Device> {
    const url = `${this.deviceurl}/${id}`;
    return this.http.delete<Device>(url)
      .pipe(
        tap((device: Device) => this.log(`Device eliminada id=${device.id}`)),
        catchError(this.handleError<Device>('DeviceService.delete'))
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
