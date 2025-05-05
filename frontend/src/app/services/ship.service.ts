import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface Ship {
  id: number;
  name: string;
  maxSpeed: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private apiUrl = 'http://localhost:5147/api/Ships';

  private _refreshNeeded = new BehaviorSubject<void>(undefined);
  refreshNeeded$ = this._refreshNeeded.asObservable();

  constructor(private http: HttpClient) {}

  getShips(): Observable<Ship[]> {
    return this.http.get<Ship[]>(this.apiUrl);
  }

  getShip(id: number): Observable<Ship> {
    return this.http.get<Ship>(`${this.apiUrl}/${id}`);
  }

  addShip(ship: Ship): Observable<Ship> {
    return this.http.post<Ship>(this.apiUrl, ship).pipe(
      tap(() => this._refreshNeeded.next())
    );
  }

  updateShip(ship: Ship): Observable<Ship> {
    return this.http.put<Ship>(`${this.apiUrl}/${ship.id}`, ship).pipe(
      tap(() => this._refreshNeeded.next())
    );
  }

  removeShip(ship: Ship): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ship.id}`).pipe(
      tap(() => this._refreshNeeded.next())
    );
  }
}
