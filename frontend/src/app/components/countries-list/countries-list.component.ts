import { Component, OnInit } from '@angular/core';
import { CountriesService, Country } from '../../services/countries.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-countries-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss'
})
export class CountriesListComponent implements OnInit {
  countries: Country[] = [];
  showAddForm = false;
  newCountry: Country = {
    id: 0,
    name: ''
  };
  editingCountry: Country | null = null;
  editingCountryId: number | null = null;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe({
      next: (data) => (this.countries = data),
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  removeCountry(country: Country): void {
    this.countriesService.removeCountry(country).subscribe({
      next: () => {
        this.countries = this.countries.filter(c => c.id !== country.id);
      },
      error: (err) => console.error('Error removing country:', err)
    });
  }

  addCountry(country: Country): void {
    this.countriesService.addCountry(country).subscribe({
      next: (newCountry) => {
        this.countries.push(newCountry);
      },
      error: (err) => console.error('Error adding country:', err)
    });
  }

  updateCountry(country: Country): void {
    this.countriesService.updateCountry(country).subscribe({
      next: (updatedCountry) => {
        const index = this.countries.findIndex(c => c.id === updatedCountry.id);
        if (index !== -1) {
          this.countries[index] = updatedCountry;
        }
      },
      error: (err) => console.error('Error updating country:', err)
    });
  }

  submitNewCountry(): void {
    if (this.newCountry.name) {
      this.addCountry(this.newCountry);
      this.newCountry = { id: 0, name: '' }; // Reset the new country form
      this.showAddForm = false; // Hide the form after submission
    }
  }

  cancelAddCountry(): void {
    this.showAddForm = false; // Hide the form without adding a country
    this.newCountry = { id: 0, name: '' }; // Reset the new country form
  }

  startEditCountry(country: Country): void {
    this.editingCountry = { ...country }; // Create a copy of the country to edit
    this.editingCountryId = country.id; // Store the ID of the country being edited
  }

  cancelEditCountry(): void {
    this.editingCountry = null; // Clear the editing country
    this.editingCountryId = null; // Clear the editing country ID
  }

  submitEditCountry(): void {
    if (this.editingCountry) {
      this.updateCountry(this.editingCountry);
      this.cancelEditCountry(); // Clear the editing state after submission  
    }
  }
}
