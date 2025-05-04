import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryVisitedListComponent } from './country-visited-list.component';

describe('CountryVisitedListComponent', () => {
  let component: CountryVisitedListComponent;
  let fixture: ComponentFixture<CountryVisitedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryVisitedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryVisitedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
