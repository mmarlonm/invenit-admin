import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GruposService } from './grupos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ColumnApi, GridApi, GridOptions } from "ag-grid-community";

//import {GridOptions} from "";
import { TimestampParserComponent } from '../../../timestamp-parser/timestamp-parser.component';
import { ListOptionsComponent } from '../../../list-options/list-options.component';

@Component({
  selector: 'grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class Grupos implements OnInit {

  public gridOptions: GridOptions;
  public rowData: any[];
  public rowData1: any[];
  public columnDefs: any[];
  private api: GridApi;
  private columnApi: ColumnApi;

  registros;

  constructor(public grupo : GruposService,private route:ActivatedRoute,private router:Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    //this.gridOptions = <GridOptions>{};
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    //this.gridOptions = <GridOptions>{localeText: {noRowsToShow: 'Sin registros'}};
    //this.gridOptions.rowHeight = 50;
    //this.rowData = this.createRowData();
    this.columnDefs = this.createColumnDefs();

    const rowData: any[] = [];

    console.log("entra a grid");

    let opciones = {populate: 'usuarioCreacion'};
    this.grupo.list(opciones)
    .subscribe(registros => {this.registros = registros
      console.log(this.registros);

      if(this.registros === undefined){
        console.log("es null");
        this.rowData = [];
      }else{
        console.log("no es null");

        this.rowData = this.registros;
      }
    });
  }

  onReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "view":
          //return this.onActionViewClick(data);
        case "remove":
          //return this.onActionRemoveClick(data);
      }
    }
  }

  private createColumnDefs() {
    const columnDefs = [
      {
        headerName: 'Editar',
        cellRendererFramework: ListOptionsComponent,
        cellRendererParams: {modulo: '/pages/administracion/grupos'}
      },
      {
        headerName: "Eliminar",
        width: 250,
        template:
          `<button type="button" data-action-type="remove" class="btn btn-danger" style="padding: 5px 54px;">
               Eliminar
            </button>`
      },
      {
        headerName: "Grupo",
        field: "name"
      },
      {
        headerName: "Activo",
        field: "active"
      },
      {
        headerName: "Fecha de creacion",
        cellRendererFramework: TimestampParserComponent,
        field: "createdAt"
      },
      {
        headerName: "Fecha de actualizacion",
        cellRendererFramework: TimestampParserComponent,
        field: "updateAt"
      }
    ]

    return columnDefs;
  }

}
