import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Model } from '../types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import * as _ from 'lodash';

@Injectable()
export class ModelosService {
  private modelUrl = environment.apiUrl + '/model';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  list(params?: any): Observable<Model[]> {
    let url = `${this.modelUrl}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Model[]>(url)
    .pipe(
      tap(modelos => this.log(`lista de modelos`)),
      catchError(this.handleError('ModelosService.list', []))
    );
  }

  get(id: string, params?: any): Observable<Model> {
    let url = `${this.modelUrl}/${id}?`;
    if (params) {
      _.mapKeys(params, (value, key) => {
        url += key + '=' + value + '&';
      });
    }
    return this.http.get<Model>(url)
    .pipe(
      tap(_ => this.log(`get Grupo id=${id}`)),
      catchError(this.handleError<Model>(`ModelosService.get id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for modelo consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ModelosService: ' + message);
  }

}
