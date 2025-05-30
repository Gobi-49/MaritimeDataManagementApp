import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipListComponent } from './ship-list.component';

describe('ShipListComponent', () => {
  let component: ShipListComponent;
  let fixture: ComponentFixture<ShipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
