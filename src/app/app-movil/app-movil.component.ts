import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/login.service';
import Swal from 'sweetalert2';
import { PedidoService } from '../service/pedido.service';
import { Modal } from 'bootstrap';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  public cantidad: number=0;
  public direccion: string = "";
  public telefono: string = "";
  public observaciones: string = "";
  public latitud: number | null = null;
  public longitud: number | null = null;
  myControl = new FormControl();
  public filteredOptions: Observable<any[]> | undefined;



  constructor(
    private router: Router,
    private itemservice: ItemService,
    private pedidoservice: PedidoService
  ) { }

  ngOnInit(): void {
    this.itemservice.getItems().subscribe(Response => {
      this.options = Response;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    });
    this.mensaje = localStorage.getItem('user') ?? '';
    this.fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
    console.log(this.mensaje);
  }
  enviar() {
    if (!this.validation()) return;
    const modal = this.ejecutarTarea();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitud = position.coords.latitude;
          this.longitud = position.coords.longitude;
          this.pedidoservice.EnviarPedido(
            this.mensaje, this.cantidad, this.direccion,
            this.telefono, this.latitud, this.longitud, this.observaciones
          ).subscribe({
            next: res => {
              modal?.hide();
              Swal.fire("Pedido enviado", "Tu pedido se guardó correctamente", "success");
              const form = document.querySelector<HTMLFormElement>('#pedidoForm');
              if (form) {
                form.classList.remove('was-validated');
              }
              this.selectedValue = '';
              this.cantidad = 0;
              this.direccion = '';
              this.telefono = '';
              this.latitud = null;
              this.longitud = null;
              this.observaciones = '';
            },
          });
        },
        (error) => {
          modal?.hide();
          Swal.fire("Error", "No se pudo obtener la ubicación.", "error");
        }
      );
    } else {
      modal?.hide();
      Swal.fire("Error", "Geolocalización no soportada en este navegador.", "error");
    }
  }

  validation(): boolean {
   const form = document.querySelector<HTMLFormElement>('#pedidoForm');
    if (form && !form.checkValidity()) {
      form.classList.add('was-validated');
      return false; 
    }
    return true; 
  }

  ejecutarTarea(): Modal | null {
    const modalElement = document.getElementById('loadingModal');
    if (!modalElement) return null;
    const modal = Modal.getOrCreateInstance(modalElement);
    modal.show();
    return modal; 
  }

  verificarPedidos():Modal|null{
    const modalElement = document.getElementById('pedidosModal');
    if (!modalElement) return null;
    const modal = Modal.getOrCreateInstance(modalElement);
    modal.show();
    return modal;
  }

  validarProducto() {
    console.log("sgd")
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  selectedValue: string = '';
}
