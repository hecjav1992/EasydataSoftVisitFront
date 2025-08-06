import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/login.service';

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

 
  constructor(private router: Router, private itemservice: ItemService) { }
  ngOnInit(): void
  {
    this.itemservice.getItems().subscribe(Response => {
      this.options = Response;
    });
    this.mensaje = localStorage.getItem('user') ?? '';
    this.fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
   
  }
  selectedValue: string = '';
}
