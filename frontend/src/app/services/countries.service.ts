import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'http://localhost:5147/api/Countries';
  
  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getCountry(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/${id}`);
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country);
  }

  updateCountry(country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.apiUrl}/${country.id}`, country);
  }

  removeCountry(county: Country): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${county.id}`);
  }
}
