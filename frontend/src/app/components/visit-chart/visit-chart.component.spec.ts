import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitChartComponent } from './visit-chart.component';

describe('VisitChartComponent', () => {
  let component: VisitChartComponent;
  let fixture: ComponentFixture<VisitChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
