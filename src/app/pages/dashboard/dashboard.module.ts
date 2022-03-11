import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';
import {MatSelectModule} from '@angular/material/select';
import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material';

//map import to dashboard
import { AgmCoreModule } from '@agm/core';
import { MarkerManager } from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; 

import { AngularOpenlayersModule } from "ngx-openlayers";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAisv7m-DGloI8luPBX5p1hh1p9O1RRz1U'
    }),
    AgmDirectionModule,
    AngularOpenlayersModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChart,
    UsersMap,
    LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard,
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    UsersMapService,
    GoogleMapsAPIWrapper
  ]
})
export class DashboardModule {}
