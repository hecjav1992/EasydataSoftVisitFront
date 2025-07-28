import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadMapService {
  private apiUrl = 'https://localhost:7071/api/Distance?origins=8.756958,-79.865128&destinations=9.3599,-79.9014&departure_time=now&mode=driving';;
  
  constructor(private http: HttpClient) { }
  getItems2(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
