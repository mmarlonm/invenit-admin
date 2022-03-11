import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RootService } from './root.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public rootService: RootService, public router: Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (!this.rootService.isAuthenticated()) {
        console.log("no loged");
        delete localStorage.token;
        delete localStorage.usuario;
        this.rootService.changeLoggedIn(false);
        this.router.navigate(['login']);
        return false;
      }
      console.log("es autentico");
      return true;

  }
}
