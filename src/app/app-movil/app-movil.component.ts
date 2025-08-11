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
  public fecha?: String;
  public mensaje: string = '';
  public item: any[] = [];
  options: any[] = [];
  public usuario: String = '';
  public cantidad: String="";
  public direccion: String="";
  public telefono: String="";
  public comentario: String = "";
  public latitud: any = null;
  public longitud: any = null;




  constructor(private router: Router, private itemservice: ItemService, private pedidoservice: PedidoService) { }
  ngOnInit(): void
  {
    this.itemservice.getItems().subscribe(Response => {
      this.options = Response;
    });
    this.mensaje = localStorage.getItem('user') ?? '';
    this.fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
   
  }
  enviar() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          console.log("Lat:", position.coords.latitude, "Lng:", position.coords.longitude);
        }
      );
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Geolocalización no soportada en este navegador.",
      });
     
    }
    this.pedidoservice.EnviarPedido(this.usuario, this.cantidad, this.direccion, this.telefono,
      this.comentario, this.latitud, this.longitud).subscribe({
        next: (res) => {
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });

        }
    });
   }
      
  
  selectedValue: string = '';
}
