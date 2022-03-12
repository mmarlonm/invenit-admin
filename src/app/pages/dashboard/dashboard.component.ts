import { Component, Input, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { DashboardService } from './dashboard.service'
import { TravelMarker } from 'travel-marker';


declare var google: any;

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  title: string = 'My first AGM project';
  zoom: number = 16;
  @Input() isEmbedded: boolean;
  @Input() filtro: any;
  geo: any;
  geo1: any;
  device: any;
  selectdev;
  //market : marker;
  // initial center position for the map
  lat: any = 18.4679628;
  lng: any = -97.3990547;
  public origin: object;
  public destination: object;
  option;
  map: any;
  map2 = [];
  marker: TravelMarker = null;
  individual:boolean;
  locationArray = [];

  onMapReady(map: any) {
    console.log(map);
    this.map = map;
    // this.calcRoute();
    //this.mockDirections();
    // this.initEvents();
  }

  constructor(private geoService: DashboardService) {
  }

  ngOnInit(): void {
    let opciones = { populate: 'group,dispositivo', ...this.filtro };
    this.geoService.list(opciones)
      .subscribe(registros => {
        this.geo = registros;
        console.log(this.geo);
        this.geo1 = this.groupBy(registros,function(item)
        {
          return [item.dispositivo];
        });
        this.individual = false;
        //this.travel(this.geo);
        this.lat = this.geo[0].latitud;
        this.lng = this.geo[0].longitud
        this.origin = { lat: this.geo[0].latitud, lng: this.geo[0].longitud };
        this.destination = { lat: this.geo[2].latitud, lng: this.geo[2].longitud };
        /*for(var item in this.geo){
          this.origin = { lat: this.geo[item].latitud, lng: this.geo[item].longitud };
        this.destination = { lat: this.geo[item+1].latitud, lng: this.geo[item+1].longitud };
        }*/

      });


    this.geoService.listDevice().subscribe(Respuesta => {
      this.device = Respuesta;
    });
  }

  groupBy(array, f) {
    var groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    })
  }

  play() {
    this.marker.play();
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  SelectDevice(dev) {
    console.log("selecciono device");
    console.log(dev.value);
    this.option = { "dispositivo": dev.value };
    this.geoService.getTracker(dev.value).subscribe(
      res => {
        console.log("lista de coordenadas solo de trackers seleccionado");
        console.log(res);
        if (res[0] != undefined) {
          this.geoService.get(res[0].id).subscribe(
            res => {
              console.log("lista de coordenadas solo de dispositivo seleccionado");
              console.log(res);
              this.geo = null;
              this.geo = res;
              this.individual = true;
              //this.marker.reset();
              if (this.marker !== null) {
                this.marker.setMap(null);
              }
              this.travel(res);
            }
          );
        }
        else {
          this.geo = null;
          this.marker.setMap(null);
        }
      }
    );
  }

  travel(t) {
    console.log(t);
    this.locationArray = [];
    for (var item in t) {
      this.map2.push([t[item].latitud, t[item].longitud]);
      this.locationArray.push(new google.maps.LatLng(t[item].latitud, t[item].longitud));
    }
    var options = {
      map: this.map,  // map object
      speed: 20,  // default 10 , animation speed
      interval: 50, // default 10, marker refresh time
      speedMultiplier: 1, // default 1, for fast-forward/rewind
      cameraOnMarker: true,  // default false, move camera with marker
      markerOptions: {
        title: "Travel Marker",
        icon: {
          url: 'https://icon-library.net/images/van-icon-png/van-icon-png-20.jpg',
          // This marker is 20 pixels wide by 32 pixels high.
          animation: google.maps.Animation.DROP,
          // size: new google.maps.Size(256, 256),
          scaledSize: new google.maps.Size(70, 70),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 10),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        }
      }
    };
    this.marker = new TravelMarker(options);
    var locationArray = [new google.maps.LatLng(18.46889, -97.398908), new google.maps.LatLng(18.46921, -97.399411), new google.maps.LatLng(18.469785, -97.399947)];
    console.log(this.locationArray);
    this.marker.addLocation(this.locationArray);
    setTimeout(() => this.play(), 2000);
  }

  markerDragEnd(m) {
    console.log(m);
  }

  mapClicked($event: MouseEvent) {
    /*this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });*/
  }


  /*markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]*/

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
