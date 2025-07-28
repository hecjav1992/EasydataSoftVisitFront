import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/login.service';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  password: string = '';
  items: any[]=[] ;
  constructor(
    private itemService: ItemService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.itemService.getItems().subscribe(Response => {
      this.items = Response;
    });  
  }
  login() {
    this.itemService.login(this.usuario, this.password).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Login exitoso, token:', res.token);
          this.router.navigate(['panel']);
        }
        if (res.success && res.token=="123abd" ){
          this.router.navigate(['App']);
        }
        else {
          console.error('Error de login');
        }
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o contraseña incorrecta",
        });
        this.usuario = '';
        this.password = '';

        console.error('Credenciales incorrectas', err);
      }
    });

  }
}
