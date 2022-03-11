import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposService } from '../grupos.service';
import { Group } from '../../../../types';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'grupos',
  templateUrl: './grupo-detalle.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./grupo-detalle.component.scss']
})
export class GrupoDetalleComponent implements OnInit {
  registroId: string;
  titulo: string = 'Grupo Detalle';
  icono: string = 'users';
  accion: number; // 1 = Alta, 2 = Actualización
  registro: Group = new Group;
  private filtroUsuarios;
  constructor(
    private route: ActivatedRoute,
    private grupos: GruposService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private modalService: NgbModal,
    private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.registroId = this.route.snapshot.paramMap.get('id');
    if (this.registroId === '0') { //Nuevo registro
      this.accion = 1;
      this.registro = new Group;
    } else { //Actualización
      this.grupos.get(this.registroId)
      .subscribe(res => {
        this.registro = res
        this.accion = 2;
      });

    }
    this.filtroUsuarios = { group: this.registroId };
  }

  guardar() {
    if (this.accion === 1) {
      this.grupos.save(this.registro)
      .subscribe(res => {
        console.log("registro guardado");
        this.registro = res;
        this.accion = 2;
        this.toastr.success('Registro guardado correctamente', 'OK');
      });
    } else {
      this.grupos.update(this.registro)
      .subscribe(res => {
        this.registro = res
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
          this.grupos.delete(this.registro.id)
          .subscribe(res => {
            this.toastr.warning('Registro eliminado', 'OK');
            setTimeout(() => this.router.navigate(['/grupos']), 500);
            //this.router.navigate(['/grupos']);
          });
      }
    }, reason => {});
  }

}
