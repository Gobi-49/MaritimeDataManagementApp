import { Component, OnInit } from '@angular/core';
import { ShipService, Ship } from '../../services/ship.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ShipListComponent implements OnInit {
  ships: Ship[] = [];
  showAddForm = false;
  newShip: Ship = {
    id: 0,
    name: '',
    maxSpeed: 0
  };
  editingShip: Ship | null = null;
  editingShipId: number | null = null;

  constructor(private shipService: ShipService) {}

  ngOnInit(): void {
    this.shipService.getShips().subscribe({
      next: (data) => (this.ships = data),
      error: (err) => console.error('Error fetching ships:', err)
    });
  }

  removeShip(ship: Ship): void {
    this.shipService.removeShip(ship).subscribe({
      next: () => {
        this.ships = this.ships.filter(s => s.id !== ship.id);
      },
      error: (err) => console.error('Error removing ship:', err)
    });
  }

  addShip(ship: Ship): void {
    this.shipService.addShip(ship).subscribe({
      next: (newShip) => {
        this.ships.push(newShip);
      },
      error: (err) => console.error('Error adding ship:', err)
    });
  }

  updateShip(ship: Ship): void {
    this.shipService.updateShip(ship).subscribe({
      next: (updatedShip) => {
        const index = this.ships.findIndex(s => s.id === updatedShip.id);
        if (index !== -1) {
          this.ships[index] = updatedShip;
        }
      },
      error: (err) => console.error('Error updating ship:', err)
    });
  }

  submitNewShip(): void {
    this.addShip(this.newShip);
    this.newShip = { id: 0, name: '', maxSpeed: 0 };
    this.showAddForm = false;
  }

  cancelAddShip(): void {
    this.showAddForm = false; // Hide the form without adding a ship
    this.newShip = { id: 0, name: '', maxSpeed: 0 }; // Reset the new ship form
  }

  startEditShip(ship: Ship): void {
    this.editingShip = ship;
    this.editingShipId = ship.id;
  }

  cancelEditShip(): void {
    this.editingShip = null;
    this.editingShipId = null;
  }

  submitEditShip(): void {
    if (this.editingShip) {
      this.updateShip(this.editingShip);
      this.cancelEditShip(); // Reset editing state after submission
    }
  }
}
