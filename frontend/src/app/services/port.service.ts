import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Port {
  id: number;
  name: string;
  countryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PortService {
  private apiUrl = 'http://localhost:5147/api/Ports';

  constructor(private http: HttpClient) { }

  getPorts(): Observable<Port[]> {
    return this.http.get<Port[]>(this.apiUrl);
  }

  getPort(id: number): Observable<Port> {
    return this.http.get<Port>(`${this.apiUrl}/${id}`);
  }

  addPort(port: Port): Observable<Port> {
    return this.http.post<Port>(this.apiUrl, port);
  }

  updatePort(port: Port): Observable<Port> {
    return this.http.put<Port>(`${this.apiUrl}/${port.id}`, port);
  }

  removePort(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
