import { Component, OnInit,Input } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from "ag-grid/main";
import { UsuariosService } from './usuarios.service';
import { TimestampParserComponent } from '../../../timestamp-parser/timestamp-parser.component';
import { ListOptionsComponent } from '../../../list-options/list-options.component';

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class Usuarios implements OnInit {
  @Input() isEmbedded: boolean;
  @Input() filtro: any;

  public gridOptions: GridOptions;
  public rowData: any[];
  public rowData1: any[];
  public columnDefs: any[];
  private api: GridApi;
  private columnApi: ColumnApi;

  registros;


  constructor(public usuarios : UsuariosService) {
    //this.gridOptions = <GridOptions>{};

   }

  ngOnInit() {
    this.gridOptions = <GridOptions>{localeText: {noRowsToShow: 'Sin registros'}};
    this.gridOptions.rowHeight = 50;
    //this.rowData = this.createRowData();
    this.columnDefs = this.createColumnDefs();

    const rowData: any[] = [];

    console.log("entra a grid");

    let opciones = {populate: 'group', ...this.filtro};
    this.usuarios.list(opciones)
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
        width: 90,
        cellRendererFramework: ListOptionsComponent,
        cellRendererParams: {modulo: '/pages/administracion/usuarios'}
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
        headerName: "Usuario",
        field: "username"
      },
      {
        headerName: "Correo Electronico",
        field: "email"
      },
      {
        headerName: "Grupo",
        field: "group.name"
      },
      {
        headerName: "Activo",
        field: "activo"
      }
    ]

    return columnDefs;
  }

}
