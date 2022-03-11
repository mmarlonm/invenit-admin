import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RootService } from '../root.service';
import { Auth, LoginMessage } from '../types';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  auth : any;
  credenciales : Auth = new Auth;
  logueando : Boolean = false;

  constructor( public loginService : LoginService, private router: Router,
     public rootService : RootService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  login(datos){
    if (datos) {
      console.log("login manda a service login");
      this.logueando = true;
      this.loginService.doLoginRemoto(datos)
      .subscribe((data) => {
        console.log(data);
        if (data.ok) {
          localStorage.usuario = JSON.stringify(data.user);
          localStorage.setItem('token', data.token);
          this.dismiss(data);
        } else {
          this.toastr.error(data.message, 'Verifique');
          this.logueando = false;
        }
       });
    }
  }

  private dismiss(loginMessage : LoginMessage) {
    this.rootService.changeLoggedIn(true);
    console.log("redirect a dash");
    this.router.navigate(['/dashboard']);
  }
}
