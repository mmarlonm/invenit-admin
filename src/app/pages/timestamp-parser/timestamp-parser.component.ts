import { Component } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-timestamp-parser',
  templateUrl: './timestamp-parser.component.html',
  styleUrls: ['./timestamp-parser.component.css']
})
export class TimestampParserComponent {

  public params: any;
  public dateFormat: string = 'YYYY-MM-DD H:mm:ss';

  agInit(params: any): void {
    let fecha = moment(params.value);
    this.params = fecha.format(this.dateFormat);
  }

}
