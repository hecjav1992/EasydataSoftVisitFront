import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { environment } from '../../environment/environment';
import { LoadMapService } from '../service/load-map.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
  standalone: false
})


export class DashboardComponentComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow?: MapInfoWindow;
  valores: any[] = [];
  infoContent: any = '';
  distancia: any;
  velociada: any;
  constructor(
    private mark: LoadMapService,
  ) { }
  ngOnInit(): void {
    this.mark.getItems2().subscribe((Response: any) => {
      this.valores = Response;
      this.distancia = Response.distancia;
      this.velociada = Response.duracion;
      console.log(this.valores)
    });

  }
  center: google.maps.LatLngLiteral = { lat: 8.537981, lng: -80.782127 };
  zoom = 6;
  markerPositions: google.maps.LatLngLiteral[] = [{ lat: 8.4460, lng: -79.9090 }, { lat: 8.88028, lng: -79.7833 }];

  openInfoWindow(marker: MapMarker, position: any) {
    this.infoContent = "la distacia recorrida" + this.distancia + " " + this.velociada;
    this.infoWindow!.open(marker);
  }


}

