import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { GruposService } from '../../grupos/grupos.service';
import { User, Group } from '../../../../types';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TrackerService } from '../../../../tracker/tracker.service'

@Component({
  selector: 'usuario',
  templateUrl: './usuarios-detalle.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./usuarios-detalle.component.scss']
})
export class UsuarioDetalleComponent implements OnInit {
  usuarioId: string;
  titulo: string = 'Usuario Detalle';
  icono: string = 'user-plus';
  accion: number; // 1 = Alta, 2 = Actualización
  usuario: User = new User;
  passwordConfirmacion: string;
  grupos: Group[];
  selectedGroup: string = '0';

  selectedTracker:string
  trackerData:any

  constructor(
    private route: ActivatedRoute,
    private usuarios: UsuariosService,
    private gruposService: GruposService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    vcr: ViewContainerRef,
    private router: Router,
    private trackerService : TrackerService) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.paramMap.get('id');
    if (this.usuarioId === '0') { //Nuevo registro
      this.accion = 1;
      this.usuario = new User;
    } else { //Actualización
      this.accion = 2;
      this.usuarios.get(this.usuarioId)
      .subscribe(res => {
        this.usuario = res
        this.selectedGroup = this.usuario.group.id;
        this.selectedTracker = this.usuario.tracker.id;
      });
    }
    this.gruposService.list({active: true})
    .subscribe(res => this.grupos = res);
    this.trackerService.list()
    .subscribe(res => this.trackerData = res);
  }

  guardar() {
    if (this.accion === 1) {
      this.usuario.group = this.selectedGroup
      console.log(this.usuario);
      this.usuarios.save(this.usuario)
      .subscribe(res => {
        this.usuario = res;
        /*this.gruposService.addUser(this.selectedGroup, this.usuario.id)
        .subscribe(res => console.log(res));*/
        this.accion = 2;
        this.toastr.success('Registro guardado correctamente', 'OK');
      });
    } else {
      this.usuario.group = this.selectedGroup;
      this.usuarios.update(this.usuario)
      .subscribe(res => {
        this.usuario = res;
        this.toastr.success('Registro actualizado correctamente', 'OK');
      });
    }
  }

  eliminar(content) {
    this.modalService
    .open(content, { size: 'sm' })
    .result
    .then((result) => {
      if (result) {
          this.usuarios.delete(this.usuario.id)
          .subscribe(res => {
            this.toastr.warning('Registro eliminado', 'OK');
            setTimeout(() => this.router.navigate(['/pages/administracion/usuarios']), 700);
          });
      }
    }, reason => {});
  }

}
