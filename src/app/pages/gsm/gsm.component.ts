import { Component, OnInit,Input } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from "ag-grid/main";
import { GsmService } from './gsm.service';

import { TimestampParserComponent } from './../timestamp-parser/timestamp-parser.component';
import { ListOptionsComponent } from '../list-options/list-options.component';

@Component({
  selector: 'gsm',
  templateUrl: './gsm.component.html',
  styleUrls: ['./gsm.component.scss']
})
export class GsmComponent implements OnInit {

  @Input() isEmbedded: boolean;
  @Input() filtro: any;


  public gridOptions: GridOptions;
  public rowData: any[];
  public rowData1: any[];
  public columnDefs: any[];
  private api: GridApi;
  private columnApi: ColumnApi;
  gsm;
  constructor(public gsmService : GsmService) { }

  ngOnInit() {
    this.gridOptions = <GridOptions>{localeText: {noRowsToShow: 'Sin registros'}};
    this.gridOptions.rowHeight = 50;

    this.columnDefs = this.createColumnDefs();

    const rowData: any[] = [];

    console.log("entra a grid");
    let opciones = {populate: 'group', ...this.filtro};
    this.gsmService.list(opciones)
    .subscribe(registros => {this.gsm = registros
      console.log(this.gsm);

      if(this.gsm === undefined){
        console.log("es null");
        this.rowData = [];
      }else{
        console.log("no es null");

        this.rowData = this.gsm;
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
        cellRendererParams: {modulo: '/pages/gsm'}
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
        headerName: "Numero",
        field: "numero"
      },
      {
        headerName: "Operadora",
        field: "operadora"
      },
      {
        headerName: "Apn",
        field: "APN"
      }
    ]

    return columnDefs;
  }

}
