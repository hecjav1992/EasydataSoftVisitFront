import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { parse } from 'parse5';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://easydatasoftvisitback.onrender.com/api/Pedidos/';
  constructor(private http: HttpClient) { }

  EnviarPedido(usuario: String, cantidad: any, direccion: String, telefono: String, comentario: String,
    latitud: any, longitud: any, observaciones:String): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      usuario: usuario,
      cantidad: parseInt(cantidad),
      direccion: direccion,
      longitud: longitud,
      latitud: latitud,
      observaciones: observaciones

    }, {
      withCredentials: true
    });
  }
}
