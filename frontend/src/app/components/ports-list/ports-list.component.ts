import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortService, Port } from '../../services/port.service';
import { CountriesService, Country } from '../../services/countries.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ports-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './ports-list.component.html',
  styleUrl: './ports-list.component.scss'
})
export class PortsListComponent implements OnInit {
  ports: Port[] = [];
  countries: Country[] = [];
  showAddForm = false;
  newPort: Port = {
    id: 0,
    name: '',
    countryId: 0,
  };
  editingPort: Port | null = null;
  editingPortId: number | null = null;

  constructor(
    private portService: PortService,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.portService.getPorts().subscribe({
      next: (data) => (this.ports = data),
      error: (err) => console.error('Error fetching ports:', err)
    });

    this.countriesService.getCountries().subscribe({
      next: (data) => (this.countries = data),
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  removePort(port: Port): void {
    this.portService.removePort(port.id).subscribe({
      next: () => {
        this.ports = this.ports.filter(p => p.id !== port.id);
      },
      error: (err) => console.error('Error removing port:', err)
    });
  }

  addPort(port: Port): void {
    this.portService.addPort(port).subscribe({
      next: (newPort) => {
        this.ports.push(newPort);
      },
      error: (err) => console.error('Error adding port:', err)
    });
  }

  updatePort(port: Port): void {
    this.portService.updatePort(port).subscribe({
      next: (updatedPort) => {
        const index = this.ports.findIndex(p => p.id === updatedPort.id);
        if (index !== -1) {
          this.ports[index] = updatedPort;
        }
      },
      error: (err) => console.error('Error updating port:', err)
    });
  }

  getCountryName(countryId: number): string {
    const country = this.countries.find(c => c.id === countryId);
    return country ? country.name : 'Unknown';
  }

  submitNewPort(): void {
    if (this.newPort.name && this.newPort.countryId) {
      this.addPort(this.newPort as Port);
      this.cancelAddPort();
    }
  }

  cancelAddPort(): void {
    this.showAddForm = false;
    this.newPort = {
      id: 0,
      name: '',
      countryId: 0,
    };
  }

  startEditPort(port: Port): void {
    this.editingPort = { ...port };
    this.editingPortId = port.id;
  }

  cancelEditPort(): void {
    this.editingPort = null;
    this.editingPortId = null;
  }

  saveEditPort(): void {
    if (this.editingPort) {
      this.updatePort(this.editingPort);
      this.cancelEditPort();
    }
  }
}
