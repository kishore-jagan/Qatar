import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import  {AgCharts} from 'ag-charts-angular';
import { AgChartOptions, AgRadialGaugeOptions } from 'ag-charts-community';

@Component({
  selector: 'app-radial-guage',
  standalone:true,
  templateUrl: './radial-guage.component.html',
  styleUrls: ['./radial-guage.component.css']
})
export class RadialGaugeComponent {
  // @ViewChild('gaugeChart', { static: true }) gaugeChart!: ElementRef;
  public chartOptions: AgRadialGaugeOptions;
  constructor() {
    this.chartOptions = {
      type: "radial-gauge",
      title: { text: "Speed" },
      value: 79,
      startAngle: 180 + 90,
      endAngle: 360 + 180,
      scale: {
        min: 0,
        max: 120,
        interval: { step: 10 },
        fillOpacity: 0.8,
      },
      segmentation: {
        interval: { values: [65, 75] },
      },
      bar: {
        fillOpacity: 0.6,
      },
      innerRadiusRatio: 0.9,
      secondaryLabel: { text: "mph" },
      cornerRadius: 50,
      targets: [
        {
          value: 70,
          shape: "triangle",
          placement: "inside",
          spacing: 5,
          fill: "#8884",
          text: "LIMIT",
          label: {
            color: "#8888",
            fontSize: 8,
            fontWeight: "bold",
            spacing: 2,
          },
        },
      ],
    };
  }
}
