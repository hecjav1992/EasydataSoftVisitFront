import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-app-movil',
  standalone: false,
  templateUrl: './app-movil.component.html',
  styleUrl: './app-movil.component.css'
})
export class AppMovilComponent implements OnInit {
  public fecha?: String;
  public mensaje: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void
  {
    this.mensaje = localStorage.getItem('user') ?? '';
    this.fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');

  } 
}
