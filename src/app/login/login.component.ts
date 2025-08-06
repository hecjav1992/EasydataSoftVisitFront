import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/login.service';
import { NavigationExtras, Router } from '@angular/router';
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
  items: any[] = [];

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
        if (res.success && res.message == "admin") {
          this.router.navigate(['panel']);
        }
        else if (res.success && res.message == "vendedor") {
          localStorage.setItem('user', res.message);
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
