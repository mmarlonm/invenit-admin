import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackerService } from '../tracker.service';
import { DeviceService } from './../../device/device.service'
import { GsmService } from './../../gsm/gsm.service'
import { Tracker } from '../../types';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tracker',
  templateUrl: './tracker-detalle.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tracker-detalle.component.scss']
})
export class TrackerDetalleComponent implements OnInit {

  trackerID: string;
  titulo : string = 'tracker detalle';
  accion :  number;
  tracker : Tracker = new Tracker;
  device;
  gsm;
  opciones;
  usuarioID;

  constructor(
    private route: ActivatedRoute,
    private trackerService: TrackerService,
    private deviceService : DeviceService,
    private gsmService : GsmService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    vcr: ViewContainerRef,
    private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.trackerID = this.route.snapshot.paramMap.get('id');

    this.usuarioID =  JSON.parse(localStorage.usuario);

    let opciones = {propietario : this.usuarioID.id};
    //lista de dispositivos para agregar al tracker
    this.deviceService.list(opciones).subscribe(res => {
      this.device = res;
    });
    //lista de gsm para agregar a tracker
    this.gsmService.list(opciones).subscribe(res => {
      this.gsm = res;
    });

    console.log(this.trackerID);

    if(this.trackerID==='0'){//nuevo registro si id es 0
      this.accion = 1;
      this.tracker = new Tracker;
    }else{//se actualiza registro si id es !=0
      this.accion = 2;
      this.trackerService.get(this.trackerID).subscribe(
        res => {
          console.log("respuesta tracker ", res)
          this.tracker = res;
        }
      );
    }

  }

  dispositivo(value){
    console.log(value);
    this.tracker.device = value;
  }
  gsmE(event){
    this.tracker.GSM = event;
  }
  guardar() {
    if (this.accion === 1) {
      console.log(this.tracker);
      this.trackerService.save(this.tracker)
      .subscribe(res => {
        this.tracker = res;
        this.accion = 2;
        this.toastr.success('Registro guardado correctamente', 'OK');
      });
    } else {
      this.trackerService.update(this.tracker)
      .subscribe(res => {
        this.tracker = res;
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
          this.trackerService.delete(this.tracker.id)
          .subscribe(res => {
            this.toastr.warning('Registro eliminado', 'OK');
            setTimeout(() => this.router.navigate(['/pages/tracker']), 700);
          });
      }
    }, reason => {});
  }

}
