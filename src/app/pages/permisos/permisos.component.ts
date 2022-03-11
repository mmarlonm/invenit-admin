import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Permission } from '../types';
import { PermisosService } from './permisos.service';
import * as _ from 'lodash';

@Component({
  selector: 'permiso',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class Permisos implements OnInit {
  @Input() modeloId: string;
  @Input() grupoId: string;
  @Input() permisos: Permission[];
  @Output() onRead = new EventEmitter<Permission[]>();
  permisosBase: any = {canCreate: false, canRead: false, canUpdate: false, canDelete: false};
  actualizando: string;

  constructor(private permisosService: PermisosService) { }

  ngOnInit() {
    if (!this.permisos) {
        this.permisosService.list({model: this.modeloId, group: this.grupoId, populate: 'usuarioCreacion'})
        .subscribe(res => {
          console.log(res);
          this.permisos = res;
          this.onRead.emit(this.permisos);
          this.parsePermisos();
        });
    } else {
      this.parsePermisos();
    }
  }

  parsePermisos() {
    if (this.permisos.length > 0) {
      this.permisosBase.create = _.findIndex(this.permisos, ['action', 'CREATE']);
      this.permisosBase.read = _.findIndex(this.permisos, ['action', 'READ']);
      this.permisosBase.update = _.findIndex(this.permisos, ['action', 'UPDATE']);
      this.permisosBase.delete = _.findIndex(this.permisos, ['action', 'DELETE']);
      //Valores boolean
      this.permisosBase.canCreate = this.permisosBase.create >= 0 ? true : false;
      this.permisosBase.canRead = this.permisosBase.read >= 0 ? true : false;
      this.permisosBase.canUpdate = this.permisosBase.update >= 0 ? true : false;
      this.permisosBase.canDelete = this.permisosBase.delete >= 0 ? true : false;
    }
  }

  setPermiso(opcion) {
    switch (opcion) {
      case 'CREATE':
        if (this.permisosBase.canCreate) { //Dar de alta el permiso de lectura
            let p = new Permission;
            p.action = 'CREATE';
            p.model = this.modeloId;
            p.relation = 'ALL';
            p.group = this.grupoId;
            this.permisosService.save(p)
            .subscribe(res => {
              this.permisos.push(res);
              this.permisosBase.create = _.findIndex(this.permisos, ['action', 'CREATE']);
              this.onRead.emit(this.permisos);
            });
        } else { //Eliminar el permiso
          this.permisosService.delete(this.permisos[this.permisosBase.create].id)
          .subscribe(res => {
            delete this.permisos[this.permisosBase.create];
            this.permisosBase.create = -1;
            this.onRead.emit(this.permisos);
          });
        }
      break;
      case 'READ':
        if (this.permisosBase.canRead) { //Dar de alta el permiso de lectura
            let p = new Permission;
            p.action = 'READ';
            p.model = this.modeloId;
            p.relation = 'OWNER';
            p.group = this.grupoId;
            this.permisosService.save(p)
            .subscribe(res => {
              this.permisos.push(res);
              this.permisosBase.read = _.findIndex(this.permisos, ['action', 'READ']);
              this.onRead.emit(this.permisos);
            });
        } else { //Eliminar el permiso
          this.permisosService.delete(this.permisos[this.permisosBase.read].id)
          .subscribe(res => {
            delete this.permisos[this.permisosBase.read];
            this.permisosBase.read = -1;
            this.onRead.emit(this.permisos);
          });
        }
      break;
      case 'UPDATE':
        if (this.permisosBase.canUpdate) { //Dar de alta el permiso de lectura
            let p = new Permission;
            p.action = 'UPDATE';
            p.model = this.modeloId;
            p.relation = 'OWNER';
            p.group = this.grupoId;
            this.permisosService.save(p)
            .subscribe(res => {
              this.permisos.push(res);
              this.permisosBase.update = _.findIndex(this.permisos, ['action', 'UPDATE']);
              this.onRead.emit(this.permisos);
            });
        } else { //Eliminar el permiso
          this.permisosService.delete(this.permisos[this.permisosBase.update].id)
          .subscribe(res => {
            delete this.permisos[this.permisosBase.update];
            this.permisosBase.update = -1;
            this.onRead.emit(this.permisos);
          });
        }
      break;
      case 'DELETE':
        if (this.permisosBase.canDelete) { //Dar de alta el permiso de lectura
            let p = new Permission;
            p.action = 'DELETE';
            p.model = this.modeloId;
            p.relation = 'OWNER';
            p.group = this.grupoId;
            this.permisosService.save(p)
            .subscribe(res => {
              this.permisos.push(res);
              this.permisosBase.delete = _.findIndex(this.permisos, ['action', 'DELETE']);
              this.onRead.emit(this.permisos);
            });
        } else { //Eliminar el permiso
          this.permisosService.delete(this.permisos[this.permisosBase.delete].id)
          .subscribe(res => {
            delete this.permisos[this.permisosBase.delete];
            this.permisosBase.delete = -1;
            this.onRead.emit(this.permisos);
          });
        }
      break;
    }
  }

  updatePermiso(opcion) {
    this.actualizando = opcion;
    switch (opcion) {
      case 'READ':
        this.permisosService.update(this.permisos[this.permisosBase.read])
        .subscribe(res => this.actualizando = '');
      break;
      case 'UPDATE':
        this.permisosService.update(this.permisos[this.permisosBase.update])
        .subscribe(res => this.actualizando = '');
      break;
      case 'DELETE':
        this.permisosService.update(this.permisos[this.permisosBase.delete])
        .subscribe(res => this.actualizando = '');
      break;
      default: break;
    }
    this.onRead.emit(this.permisos);
  }

}
