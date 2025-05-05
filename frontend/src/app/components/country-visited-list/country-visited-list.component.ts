import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryVisitedService, CountryVisited } from '../../services/country-visited.service';
import { CountriesService, Country } from '../../services/countries.service';
import { ShipService, Ship } from '../../services/ship.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-visited-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './country-visited-list.component.html',
  styleUrl: './country-visited-list.component.scss'
})
export class CountryVisitedListComponent {
  countriesVisited: CountryVisited[] = [];
  countries: Country[] = [];
  ships: Ship[] = [];
  showAddForm = false;
  newCountryVisited: Partial<CountryVisited> = {
    id: 0,
    countryId: 0,
    shipId: 0,
    dateVisited: new Date()
  };
  editingCountryVisited: CountryVisited | null = null;
  editingCountryVisitedId: number | null = null;

  constructor(
    private countryVisitedService: CountryVisitedService,
    private countriesService: CountriesService,
    private shipService: ShipService
  ) {}

  ngOnInit(): void {
    this.countryVisitedService.getCountriesVisited().subscribe({
      next: (data) => (this.countriesVisited = data),
      error: (err) => console.error('Error fetching countries visited:', err)
    });

    this.countriesService.getCountries().subscribe({
      next: (data) => (this.countries = data),
      error: (err) => console.error('Error fetching countries:', err)
    });

    this.shipService.getShips().subscribe({
      next: (data) => (this.ships = data),
      error: (err) => console.error('Error fetching ships:', err)
    });
  }

  removeCountryVisited(countryVisited: CountryVisited): void {
    this.countryVisitedService.removeCountryVisited(countryVisited.id).subscribe({
      next: () => {
        this.countriesVisited = this.countriesVisited.filter(c => c.id !== countryVisited.id);
      },
      error: (err) => console.error('Error removing country visited:', err)
    });
  }

  addCountryVisited(countryVisited: CountryVisited): void {
    this.countryVisitedService.addCountryVisited(countryVisited).subscribe({
      next: (newCountryVisited) => {
        this.countriesVisited.push(newCountryVisited);
      },
      error: (err) => console.error('Error adding country visited:', err)
    });
  }

  updateCountryVisited(countryVisited: CountryVisited): void {
    this.countryVisitedService.updateCountryVisited(countryVisited).subscribe({
      next: (updatedCountryVisited) => {
        const index = this.countriesVisited.findIndex(c => c.id === updatedCountryVisited.id);
        if (index !== -1) {
          this.countriesVisited[index] = updatedCountryVisited;
        }
      },
      error: (err) => console.error('Error updating country visited:', err)
    });
  }

  getCountryName(countryId: number): string | undefined {
    const country = this.countries.find(c => c.id === countryId);
    return country ? country.name : undefined;
  }

  getShipName(shipId: number): string | undefined {
    const ship = this.ships.find(s => s.id === shipId);
    return ship ? ship.name : undefined;
  }

  submitNewCountryVisited(): void {
    if (this.newCountryVisited.countryId && this.newCountryVisited.shipId && this.newCountryVisited.dateVisited) {
      if (!this.isDateValid(this.newCountryVisited.dateVisited as Date)) {
        alert('Date must be within the last year.');
        return;
      } else {
        this.addCountryVisited(this.newCountryVisited as CountryVisited);
        this.cancelAddCountryVisited();
      }
    }
  }

  cancelAddCountryVisited(): void {
    this.showAddForm = false;
    this.newCountryVisited = {
      id: 0,
      countryId: 0,
      shipId: 0,
      dateVisited: new Date()
    };
  }

  editCountryVisited(countryVisited: CountryVisited): void {
    this.editingCountryVisited = { ...countryVisited };
    this.editingCountryVisitedId = countryVisited.id;
  }

  cancelEditCountryVisited(): void {
    this.editingCountryVisited = null;
    this.editingCountryVisitedId = null;
  }

  saveEditCountryVisited(): void {
    if (this.editingCountryVisited) {
      if (!this.isDateValid(this.editingCountryVisited.dateVisited)) {
        alert('Date must be within the last year.');
      } else {
        this.updateCountryVisited(this.editingCountryVisited);
        this.cancelEditCountryVisited();
      }
    }
  }

  isDateValid(inputDate: Date): boolean {
    const cutoff = new Date();
    const currentDate = new Date(inputDate);

    currentDate.setHours(0, 0, 0, 0); // Normalize time to midnight
    cutoff.setHours(0, 0, 0, 0); // Normalize time to midnight
    cutoff.setFullYear(cutoff.getFullYear() - 1); // 1 year ago

    return currentDate >= cutoff;
  }

}
