import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://easydatasoftvisitback.onrender.com/api/Pedidos/';

  constructor(private http: HttpClient) { }

  EnviarPedido(usuario: string,cantidad: number,direccion: string,telefono: string,
    latitud: number,longitud: number,observaciones: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      usuario: usuario,
      cantidad: cantidad,
      direccion: direccion,
      telefono: telefono,
      latitud: latitud,
      longitud: longitud,
      observaciones: observaciones,
      fecha_pedido: new Date().toISOString(),
      estado: "pendiente",
      total: 0
    }, {
      withCredentials: true
    });
  }
}
