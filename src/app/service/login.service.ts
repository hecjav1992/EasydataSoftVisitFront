import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://easydatasoftvisitback.onrender.com/api/loging';

  constructor(private http: HttpClient) { }
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post<any>('https://easydatasoftvisitback.onrender.com/api/Loging/login', {
      username: usuario,
      password: password
    });
  }
  
}
