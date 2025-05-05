import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Country {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'http://localhost:5147/api/Countries';

  private _refreshNeeded = new BehaviorSubject<void>(undefined);
  _refreshNeeded$ = this._refreshNeeded.asObservable();
  
  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getCountry(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/${id}`);
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country).pipe(
      tap(() => {this._refreshNeeded.next();})
    );
  }

  updateCountry(country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.apiUrl}/${country.id}`, country).pipe(
      tap(() => {this._refreshNeeded.next();})
    );
  }

  removeCountry(county: Country): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${county.id}`).pipe(
      tap(() => {this._refreshNeeded.next();})
    );
  }
}
