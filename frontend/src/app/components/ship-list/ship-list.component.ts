import { Component, OnInit } from '@angular/core';
import { ShipService, Ship } from '../../services/ship.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ShipListComponent implements OnInit {
  ships: Ship[] = [];

  constructor(private shipService: ShipService) {}

  ngOnInit(): void {
    this.shipService.getShips().subscribe({
      next: (data) => (this.ships = data),
      error: (err) => console.error('Error fetching ships:', err)
    });
  }
}
