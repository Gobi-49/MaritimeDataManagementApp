import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface CountryVisited {
  id: number;
  countryId: number;
  shipId: number;
  dateVisited: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CountryVisitedService {
  private apiUrl = 'http://localhost:5147/api/CountriesVisited';
  private _refreshNeeded = new BehaviorSubject<void>(undefined);
  refreshNeeded$ = this._refreshNeeded.asObservable();

  constructor(private http: HttpClient) { }

  getCountriesVisited(): Observable<CountryVisited[]> {
    return this.http.get<CountryVisited[]>(this.apiUrl);
  }

  getCountryVisited(id: number): Observable<CountryVisited> {
    return this.http.get<CountryVisited>(`${this.apiUrl}/${id}`);
  } 

  addCountryVisited(countryVisited: CountryVisited): Observable<CountryVisited> {
    return this.http.post<CountryVisited>(this.apiUrl, countryVisited).pipe(
      tap(() => this._refreshNeeded.next())
    );
  }

  updateCountryVisited(countryVisited: CountryVisited): Observable<CountryVisited> {
    return this.http.put<CountryVisited>(`${this.apiUrl}/${countryVisited.id}`, countryVisited).pipe(
      tap(() => this._refreshNeeded.next())
      );
  }

  removeCountryVisited(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this._refreshNeeded.next())
      );
  }
}
