import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PerfilService } from './perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User, Group } from '../types';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class Perfil implements OnInit {
  filesToUpload: Array<any> = [];
  usuarioID: string;
  registros;
  usuario : User = new User;
  accion = 1;
  base64;
  constructor(public perfil : PerfilService,private route:ActivatedRoute,private router:Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    //this.gridOptions = <GridOptions>{};
    this.toastr.setRootViewContainerRef(vcr);
    this.usuarioID = this.route.snapshot.paramMap.get('id');
    console.log(this.usuarioID);
   }

  ngOnInit() {

    let opciones = {id : this.usuarioID};
    this.perfil.list(opciones)
    .subscribe(registros => {this.registros = registros
      if(registros){
        console.log(this.registros);
        this.usuario = this.registros[0];
        if(this.usuario.avatar)
        {
          this.accion = 2;
        }
      }
    });

  }
  imagen(evento : any) {
    this.filesToUpload= evento.target.files;

    var files = this.filesToUpload;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this.imagenE.bind(file);
      reader.readAsBinaryString(file);
      setTimeout(()=>{    //<<<---    using ()=> syntax
        if(file.base64){
        this.accion = 2;
        this.usuario.avatar=file.base64;
      }

       }, 300);


    }
  }
imagenE(readerEvt) {
    //console.log(readerEvt);
    var binaryString = readerEvt.target.result;
    this.base64 = btoa(binaryString);
  }


  guardar() {
      this.perfil.update(this.usuario)
      .subscribe(res => {
        this.usuario = res;
        console.log(this.usuario);
        this.toastr.success('Registro actualizado correctamente', 'OK');
      });

  }

}
