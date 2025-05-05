import { Component, OnInit, viewChild} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CountriesService } from '../../services/countries.service';
import { CountryVisitedService } from '../../services/country-visited.service';
import { count } from 'rxjs';
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-visit-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './visit-chart.component.html',
  styleUrl: './visit-chart.component.scss'
})

export class VisitChartComponent implements OnInit {
  chartType: ChartType = 'bar';
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Visits per Country',
        // backgroundColor: '#42A5F5',
        // hoverBackgroundColor: '#1E88E5',
        // borderColor: '#1E88E5',
        // borderWidth: 2,
      },
    ],
  };

  constructor(
    private countriesService: CountriesService,
    private countryVisitedService: CountryVisitedService
  ) {}

  ngOnInit(): void {
    this.countryVisitedService.refreshNeeded$.subscribe(() => {
      this.updateChartData();
    });

    this.countriesService._refreshNeeded$.subscribe(() => {
      this.updateChartData();
    });
    
    this.updateChartData();
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private async updateChartData(): Promise<void> {
    const visits = await firstValueFrom(this.countryVisitedService.getCountriesVisited());
    const countries = await firstValueFrom(this.countriesService.getCountries());

    const visitCountMap: { [countryId: number]: number } = {};

    visits.forEach(v => {
      visitCountMap[v.countryId] = (visitCountMap[v.countryId] || 0) + 1;
    });

    this.chartData.labels = countries.map(c => c.name);
    this.chartData.datasets[0].data = countries.map(c => visitCountMap[c.id] || 0);

    this.chart?.update(); // Update the chart with new data
  }
}
