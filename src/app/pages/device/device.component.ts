import { Component, OnInit,Input } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from "ag-grid/main";
import { DeviceService } from './device.service';

import { TimestampParserComponent } from './../timestamp-parser/timestamp-parser.component';
import { ListOptionsComponent } from '../list-options/list-options.component';
import { Device } from '../types';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() isEmbedded: boolean;
  @Input() filtro: any;


  gridOptions: GridOptions;
  public rowData: any[];
  public rowData1: any[];
  public columnDefs: any[];
  private api: GridApi;
  private columnApi: ColumnApi;
  device;
  constructor(public deviceService : DeviceService) { }

  ngOnInit() {
    this.gridOptions = <GridOptions>{localeText: {noRowsToShow: 'Sin registros'}};
    this.gridOptions.rowHeight = 50;

    this.columnDefs = this.createColumnDefs();

    const rowData: any[] = [];

    console.log("entra a grid");
    
    let opciones = {populate: 'group', ...this.filtro};
    this.deviceService.list(opciones)
    .subscribe(registros => {this.device = registros
      console.log(this.device);

      if(this.device === undefined){
        console.log("es null");
        this.rowData = [];
      }else{
        console.log("no es null");

        this.rowData = this.device;
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
        width: 90,
        cellRendererFramework: ListOptionsComponent,
        cellRendererParams: {modulo: '/pages/device'}
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
        headerName: "Marca",
        field: "marca"
      },
      {
        headerName: "Modelo",
        field: "modelo"
      }
    ]

    return columnDefs;
  }


}
