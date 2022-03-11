import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalState} from '../../../global.state';
import { PerfilService } from './../../../pages/perfil/perfil.service';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  subscription:Subscription;
  loggedIn: boolean;
  usuario : any;
  IDuser;
  registros;
  accion;
  constructor(private _state:GlobalState,private route:ActivatedRoute,private router:Router, private perfil: PerfilService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    if (localStorage.usuario) {
          this.accion=1;
      this.IDuser = JSON.parse(localStorage.usuario);

      let opciones = {id : this.IDuser.id};
      this.perfil.list(opciones)
      .subscribe(registros => {this.registros = registros
        if(registros){
          this.usuario = this.registros[0];
          if(this.usuario.avatar)
          {
            this.accion = 2;
          }
        }
      });
    }else{
      this.IDuser = "";
    }
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  logout(){
    delete localStorage.token;
    delete localStorage.usuario;
    this.router.navigate(['/login']);
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
