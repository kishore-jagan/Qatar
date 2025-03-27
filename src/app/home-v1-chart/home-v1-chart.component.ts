import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
    selector: 'app-home-v1-chart',
    imports: [CommonModule, NgChartsModule],
    templateUrl: './home-v1-chart.component.html',
    styleUrls: ['./home-v1-chart.component.css']
})
export class HomeV1ChartComponent {
  public lineChartOptions: ChartConfiguration['options'] = {
    plugins: {
      title: {
        display: false, // Disable title
      },
      legend: {
        display: false, // Disable legend
      },
    },
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    elements: {
      line: {
        tension: 0.4, // Enables smooth lines
      },
      point: {
        radius: 0, // Hide points
      },
    },
    interaction: {
      intersect: false,
    },
  };

  public lineChartData?: ChartData<'line'>;
  public lineChartType: ChartType = 'line';

  inputs = {
    min: 0,
    max: 100,
    count: 8,
    decimals: 2,
    continuity: 1,
  };

  ngOnInit(): void {
    this.lineChartData = {
      labels: this.generateLabels(),
      datasets: [
    
        {
          data: this.generateData(),
          borderColor: 'white',
          backgroundColor: 'rgba(167, 167, 219, 0.72)',
          fill: true,
          borderWidth:0.5
        },
      ],
    };
  }

  private generateLabels(): string[] {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
    return months.slice(0, this.inputs.count);
  }

  private generateData(): number[] {
    const { min, max, count } = this.inputs;
    return Array.from({ length: count }, () =>
      parseFloat((Math.random() * (max - min) + min).toFixed(this.inputs.decimals))
    );
  }
}
