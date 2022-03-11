import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GsmService } from '../gsm.service';
import { Gsm } from '../../types';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-gsm-detalle',
  templateUrl: './gsm-detalle.component.html',
  styleUrls: ['./gsm-detalle.component.scss']
})
export class GsmDetalleComponent implements OnInit {

  gsmID: string;
  titulo : string = 'gsm detalle';
  accion :  number;
  gsm : Gsm = new Gsm;
  usuarioId;

  constructor(
    private route: ActivatedRoute,
    private gsmService: GsmService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    vcr: ViewContainerRef,
    private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);

      this.usuarioId = JSON.parse(localStorage.usuario);
      console.log("id usuario");
      console.log(this.usuarioId.id);
    }

  ngOnInit() {
    this.gsmID = this.route.snapshot.paramMap.get('id');

    console.log(this.gsmID);

    if(this.gsmID==='0'){//nuevo registro si id es 0
      this.accion = 1;
      this.gsm = new Gsm;
    }else{//se actualiza registro si id es !=0
      this.accion = 2;
      this.gsmService.get(this.gsmID).subscribe(
        res => {
          this.gsm = res;
        }
      );
    }
  }

  guardar() {
    if (this.accion === 1) {
      //this.gsm.propietario = this.usuarioId.id;
      console.log(this.gsm);
      this.gsmService.save(this.gsm)
      .subscribe(res => {
        this.gsm = res;
        this.accion = 2;
        this.toastr.success('Registro guardado correctamente', 'OK');
      });
    } else {
      this.gsmService.update(this.gsm)
      .subscribe(res => {
        this.gsm = res;
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
          this.gsmService.delete(this.gsm.id)
          .subscribe(res => {
            this.toastr.warning('Registro eliminado', 'OK');
            setTimeout(() => this.router.navigate(['/pages/tracker']), 700);
          });
      }
    }, reason => {});
  }

}
