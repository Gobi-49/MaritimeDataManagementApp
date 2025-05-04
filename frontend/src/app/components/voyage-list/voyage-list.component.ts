import { Component } from '@angular/core';
import { VoyageService, Voyage } from '../../services/voyage.service';
import { PortService, Port } from '../../services/port.service';
import { ShipService, Ship } from '../../services/ship.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voyage-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './voyage-list.component.html',
  styleUrl: './voyage-list.component.scss'
})
export class VoyageListComponent {
  voyages: Voyage[] = [];
  ports: Port[] = [];
  ships: Ship[] = [];
  showAddForm = false;
  newVoyage: Voyage = {
    id: 0,
    date: new Date(),
    departurePortId: 0,
    arrivalPortId: 0,
    start: new Date(),
    end: new Date(),
    shipId: 0
  };
  editingVoyage: Voyage | null = null;
  editingVoyageId: number | null = null;

  constructor(
    private voyageService: VoyageService,
    private portsService: PortService,
    private shipService: ShipService
  ) {}

  ngOnInit(): void {
    this.voyageService.getVoyages().subscribe({
      next: (data) => (this.voyages = data),
      error: (err) => console.error('Error fetching voyages:', err)
    });

    this.portsService.getPorts().subscribe({
      next: (data) => (this.ports = data),
      error: (err) => console.error('Error fetching ports:', err)
    });

    this.shipService.getShips().subscribe({
      next: (data) => (this.ships = data),
      error: (err) => console.error('Error fetching ships:', err)
    });
  }

  removeVoyage(voyage: Voyage): void {
    if (!voyage.id) return; // Ensure voyage has an ID before attempting to remove
    this.voyageService.removeVoyage(voyage.id).subscribe({
      next: () => {
        this.voyages = this.voyages.filter(v => v.id !== voyage.id);
      },
      error: (err) => console.error('Error removing voyage:', err)
    });
  }

  addVoyage(voyage: Voyage): void {
    this.voyageService.addVoyage(voyage).subscribe({
      next: (newVoyage) => {
        this.voyages.push(newVoyage);
      },
      error: (err) => console.error('Error adding voyage:', err)
    });
  }

  submitNewVoyage(): void {
    if (
      this.newVoyage.departurePortId &&
      this.newVoyage.arrivalPortId &&
      this.newVoyage.start &&
      this.newVoyage.end
    ) {
      this.addVoyage(this.newVoyage as Voyage);
      this.showAddForm = false;
      this.newVoyage = {
        date: new Date(),
        departurePortId: 0,
        arrivalPortId: 0,
        start: new Date(),
        end: new Date(),
        shipId: 0
      };
    }
  }

  cancelAddVoyage(): void {
    this.showAddForm = false;
    this.newVoyage = {
      date: new Date(),
      departurePortId: 0,
      arrivalPortId: 0,
      start: new Date(),
      end: new Date(),
      shipId: 0
    };
  }

  updateVoyage(voyage: Voyage): void {
    this.voyageService.updateVoyage(voyage).subscribe({
      next: (updatedVoyage) => {
        const index = this.voyages.findIndex(v => v.id === updatedVoyage.id);
        if (index !== -1) {
          this.voyages[index] = updatedVoyage;
        }
      },
      error: (err) => console.error('Error updating voyage:', err)
    });
  }

  getPortName(portId: number): string {
    const port = this.ports.find(p => p.id === portId);
    return port ? port.name : 'Unknown Port';
  }

  getShipName(shipId: number): string {
    const ship = this.ships.find(s => s.id === shipId);
    return ship ? ship.name : 'Unknown Ship';
  }

  startEditVoyage(voyage: Voyage): void {
    this.editingVoyage = { ...voyage }; // Create a copy of the voyage to edit
    this.editingVoyageId = voyage.id ?? null; // Store the ID of the voyage being edited or null if undefined
  }

  cancelEditVoyage(): void { 
    this.editingVoyage = null; // Clear the editing state
    this.editingVoyageId = null; // Clear the ID of the voyage being edited
  }

  saveEditVoyage(): void {
    if (this.editingVoyage) {
      this.updateVoyage(this.editingVoyage);
      this.cancelEditVoyage(); // Clear the editing state after saving
    }
  }
}
