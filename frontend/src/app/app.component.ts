import { Component } from '@angular/core';
import { ShipListComponent } from './components/ship-list/ship-list.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { PortsListComponent } from './components/ports-list/ports-list.component';
import { CountryVisitedListComponent } from './components/country-visited-list/country-visited-list.component';
import { VoyageListComponent } from './components/voyage-list/voyage-list.component';

@Component({
  selector: 'app-root',
  imports: [
    ShipListComponent, 
    CountriesListComponent, 
    PortsListComponent,
    CountryVisitedListComponent,
    VoyageListComponent
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
