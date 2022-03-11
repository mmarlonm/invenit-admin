import { Component } from '@angular/core';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent {
  private params: any;
  private editLink: string;
  constructor() { }

  agInit(params: any): void {
    this.editLink = '/' + params.modulo + '/' + params.data.id;
    this.params = params;
  }

}
