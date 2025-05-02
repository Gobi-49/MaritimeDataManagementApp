import { Component, OnInit } from '@angular/core';
import { CountriesService, Country } from '../../services/countries.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countries-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss'
})
export class CountriesListComponent implements OnInit {
  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe({
      next: (data) => (this.countries = data),
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

}
