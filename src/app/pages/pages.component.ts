import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import {ActivatedRoute, Router} from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { RootService } from './root.service';
import { LoginService } from './login/login.service';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <!--footer class="al-footer clearfix">
      <div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://akveo.com" translate>{{'general.akveo'}}</a> 2016</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer-->
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService,private route:ActivatedRoute,private router:Router,
  public rootService : RootService,
  private loginService : LoginService) {

    if (!rootService.isAuthenticated()) {
      console.log("no autenticado");
      rootService.changeLoggedIn(false);
      delete localStorage.token;
      delete localStorage.usuario;
      router.navigate(['/login']);
    } else {
    console.log("root changeLoggedIn true");
      rootService.changeLoggedIn(true);
      if (router.url === '/login') {
          router.navigate(['/dashboard']);
      }
    }
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
