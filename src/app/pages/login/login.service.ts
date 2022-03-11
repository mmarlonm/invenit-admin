import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { environment } from './../../../environments/environment';
import { User, LoginMessage, Auth } from '../types';
import { RootService } from '../root.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
  token : any;
  private loginEndpoint = '/login';
  private logoutEndpoint = '/logout';
  private checarSesionEndpoint = '/me';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public rootService : RootService) { }

  /*
  * Checar si hay una sesión activa
  */
  getLoggedUser() : Observable<any> {
    console.log("sesion no activa");
    const url = environment.apiUrl + this.checarSesionEndpoint;
    return this.http.get<any>(url)
    .pipe(
      tap(res => this.log(`Logged User`)),
      catchError(this.handleError<any>('LoginService.getLoggedUser'))
    );
  }

  //Es necesario enviar la cabecera "withCredentials: true" para que después de login permita siguiente request
  doLoginRemoto(credenciales : any) : Observable<LoginMessage> {
    const url = environment.apiUrl + this.loginEndpoint;
    console.log(url);
    return this.http.post<LoginMessage>(url, credenciales, httpOptions)
    .pipe(
      tap((mensaje: LoginMessage) => this.log(`Login id=${credenciales}`)),
      catchError(this.handleError<LoginMessage>('LoginService.doLoginRemoto'))
    );
  }

  doLogout() : void {
    console.log("do login");
    const url = environment.apiUrl + this.logoutEndpoint;
    this.http.post(url, '')
    .pipe(
      tap(res => this.log(`Logout`)),
      catchError(this.handleError('LoginService.doLogout', []))
    );
    this.rootService.changeLoggedIn(false);
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
    this.messageService.add('LoginService: ' + message);
  }
}
