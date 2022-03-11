import { Component, OnInit,Input } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from "ag-grid/main";
import { TrackerService } from './tracker.service';

import { TimestampParserComponent } from './../timestamp-parser/timestamp-parser.component';
import { ListOptionsComponent } from '../list-options/list-options.component';

@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  @Input() isEmbedded: boolean;
  @Input() filtro: any;


  private gridOptions: GridOptions;
  public rowData: any[];
  public rowData1: any[];
  public columnDefs: any[];
  private api: GridApi;
  private columnApi: ColumnApi;

  trackers;

  constructor(public tracker : TrackerService) {
    //this.gridOptions = <GridOptions>{};
   }

  ngOnInit() {
    this.gridOptions = <GridOptions>{localeText: {noRowsToShow: 'Sin registros'}};
    this.gridOptions.rowHeight = 50;

    this.columnDefs = this.createColumnDefs();

    const rowData: any[] = [];

    console.log("entra a grid");

    let opciones = {populate: 'group', ...this.filtro};
    this.tracker.list(opciones)
    .subscribe(registros => {this.trackers = registros
      console.log(this.trackers);

      if(this.trackers === undefined){
        console.log("es null");
        this.rowData = [];
      }else{
        console.log("no es null");

        this.rowData = this.trackers;
      }
    });
  }

  private onReady(params) {
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
        cellRendererParams: {modulo: '/pages/tracker'}
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
        headerName: "Nombre",
        field: "nombre"
      },
      {
        headerName: "Imei",
        field: "imei"
      },
      {
        headerName: "Device",
        field: "device"
      },
      {
        headerName: "GSM",
        field: "gsm"
      }
    ]

    return columnDefs;
  }

}
