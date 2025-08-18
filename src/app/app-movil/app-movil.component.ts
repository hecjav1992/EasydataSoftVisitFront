import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/login.service';
import Swal from 'sweetalert2';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-app-movil',
  standalone: false,
  templateUrl: './app-movil.component.html',
  styleUrl: './app-movil.component.css'
})
export class AppMovilComponent implements OnInit {
  public fecha?: string;
  public mensaje: string = '';
  public item: any[] = [];
  options: any[] = [];
  public cantidad: number = 0;
  public direccion: string = "";
  public telefono: string = "";
  public observaciones: string = "";
  public latitud: number | null = null;
  public longitud: number | null = null;

  constructor(
    private router: Router,
    private itemservice: ItemService,
    private pedidoservice: PedidoService
  ) { }

  ngOnInit(): void {
    this.itemservice.getItems().subscribe(Response => {
      this.options = Response;
    });
    this.mensaje = localStorage.getItem('user') ?? '';
    this.fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
    console.log(this.mensaje);
  }

  enviar() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitud = position.coords.latitude;
          this.longitud = position.coords.longitude;
          this.pedidoservice.EnviarPedido(this.mensaje,this.cantidad,this.direccion,
            this.telefono,this.latitud,this.longitud,this.observaciones).subscribe({
            next: res => {
                Swal.fire("Pedido enviado", "Tu pedido se guardó correctamente", "success");
            },
          });
        },
        (error) => {
          Swal.fire("Error", "No se pudo obtener la ubicación.", "error");
        }
      );
    } else {
      Swal.fire("Error", "Geolocalización no soportada en este navegador.", "error");
    }
  }

  selectedValue: string = '';
}
