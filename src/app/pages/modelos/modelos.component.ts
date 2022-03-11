import { Component, OnInit, Input } from '@angular/core';
import { ModelosService } from './modelos.service';
import { Permission, Model } from '../types';

@Component({
  selector: 'modelos',
  templateUrl: './modelos.component.html'
})
export class Modelos implements OnInit {
  @Input() grupoId: string;
  modelos: Model[];
  constructor(private modelosService: ModelosService) { }

  ngOnInit() {
    this.modelosService.list({select: 'name', populate: 'usuarioCreacion'})
    .subscribe(res => this.modelos = res);
  }

  onRead(permisos: Permission[], i) {
    this.modelos[i].permissions = permisos;
  }

}
