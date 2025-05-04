import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Voyage {
  id?: number;
  date: Date;
  departurePortId: number;
  arrivalPortId: number;
  start: Date;
  end: Date;
  shipId: number;
}

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  private apiUrl = 'http://localhost:5147/api/Voyages';

  constructor(private http: HttpClient) { }

  getVoyages(): Observable<Voyage[]> {
    return this.http.get<Voyage[]>(this.apiUrl);
  }

  getVoyage(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(`${this.apiUrl}/${id}`);
  }

  addVoyage(voyage: Voyage): Observable<Voyage> {
    return this.http.post<Voyage>(this.apiUrl, voyage);
  }

  updateVoyage(voyage: Voyage): Observable<Voyage> {
    return this.http.put<Voyage>(`${this.apiUrl}/${voyage.id}`, voyage);
  }

  removeVoyage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
