import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../device.service';
import { Device } from '../../types';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'device',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './device-detalle.component.html',
  styleUrls: ['./device-detalle.component.scss']
})
export class DeviceDetalleComponent implements OnInit {
  
  filesToUpload: Array<any> = [];
  base64;
  accion : number;//1 = alta, 2 = update
  accionI : number;//1 = mostrar imagen por defecto, 2 update imagen
  deviceID : string;
  fotografia : string;
  marca : string;
  modelo: string;
  device : Device = new Device;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    vcr: ViewContainerRef,
    private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
    }


  ngOnInit() {
    this.deviceID = this.route.snapshot.paramMap.get('id');

    if(this.deviceID === '0'){//nuevo registro
      this.accion = 1;
      this.accionI =  1;
      this.device = new Device;
    }else{//actualizar si id es !=0
      this.accion = 2;
      this.accionI =  2;
      this.deviceService.get(this.deviceID).subscribe(
        res =>{
          this.device = res;
        }
      );
    }
  }

  guardar() {
    if (this.accion === 1) {
      console.log(this.device);
      this.deviceService.save(this.device)
      .subscribe(res => {
        this.device = res;
        this.accion = 2;
        this.toastr.success('Registro guardado correctamente', 'OK');
      });
    } else {
      this.deviceService.update(this.device)
      .subscribe(res => {
        this.device = res;
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
          this.deviceService.delete(this.device.id)
          .subscribe(res => {
            this.toastr.warning('Registro eliminado', 'OK');
            setTimeout(() => this.router.navigate(['/pages/device']), 700);
          });
      }
    }, reason => {});
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
        this.accionI = 2;
        this.device.fotografia=file.base64;
      }

       }, 300);


    }
  }
  imagenE(readerEvt) {
    //console.log(readerEvt);
    var binaryString = readerEvt.target.result;
    this.base64 = btoa(binaryString);
  }

}
