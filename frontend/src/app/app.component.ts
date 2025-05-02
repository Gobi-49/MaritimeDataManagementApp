import { Component } from '@angular/core';
import { ShipListComponent } from './components/ship-list/ship-list.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';

@Component({
  selector: 'app-root',
  imports: [ShipListComponent, CountriesListComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
