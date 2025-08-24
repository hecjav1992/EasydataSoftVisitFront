import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LoadMapService } from '../service/load-map.service';

interface Pedido {
  id_pedido: number;
  usuario: string;
  fecha_pedido: string;
  latitud: number;
  longitud: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
  standalone: false
})
export class DashboardComponentComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow?: MapInfoWindow;

  valores: any[] = [];
  infoContent: string = '';
  distancia: any;
  velociada: any;

  ubicacion: Pedido[] = [];
  markerPositions: google.maps.LatLngLiteral[] = [];

  center: google.maps.LatLngLiteral = { lat: 8.537981, lng: -80.782127 };
  zoom = 6;

  constructor(
    private mark: LoadMapService,
    private mark2: LoadMapService
  ) { }

  ngOnInit(): void {
    this.mark.getItems2().subscribe((response: any[]) => {
      this.valores = response;
      if (response.length > 0) {
        this.distancia = response[0].distancia;
        this.velociada = response[0].duracion;
      }
      console.log('Valores:', this.valores);
    });
    this.mark2.getUbicacion().subscribe((response: Pedido[]) => {
      if (response && response.length > 0) {
        this.ubicacion = response;
        this.markerPositions = this.ubicacion.map(pedido => ({
          lat: pedido.latitud,
          lng: pedido.longitud
        }));

        console.log('Ubicaciones:', this.ubicacion);
        console.log('Marcadores:', this.markerPositions);
      } else {
        console.log('No hay pedidos disponibles');
      }
    });
  }

  openInfoWindow(marker: MapMarker, position: any) {
    this.infoContent = `La distancia recorrida: ${this.distancia}, Duración: ${this.velociada}`;
    this.infoWindow!.open(marker);
  }

}
