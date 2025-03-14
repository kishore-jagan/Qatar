import { Component, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-radar-home',
  standalone: true,
  templateUrl: './radar-home.component.html',
  styleUrls: ['./radar-home.component.css'],
})
export class RadarHomeComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    const chartDom = document.getElementById('radar-chart')!;
    const radarChart = echarts.init(chartDom);

    // Example API Data (20 data points)
    const apiData = [
      { date: '2024-11-01', speed: 2, direction: 230 },
      { date: '2024-11-02', speed: 1, direction: 180 },
      { date: '2024-11-03', speed: 4, direction: 230 },
      { date: '2024-11-04', speed: 2, direction: 180 },
      { date: '2024-11-05', speed: 3, direction: 300 },
      { date: '2024-11-06', speed: 2, direction: 60 },
      { date: '2024-11-07', speed: 1, direction: 90 },
      { date: '2024-11-08', speed: 4, direction: 250 },
      { date: '2024-11-09', speed: 3, direction: 45 },
      { date: '2024-11-10', speed: 1, direction: 120 },
      { date: '2024-11-11', speed: 2, direction: 310 },
      { date: '2024-11-12', speed: 4, direction: 200 },
      { date: '2024-11-13', speed: 3, direction: 150 },
      { date: '2024-11-14', speed: 2, direction: 0 },
      { date: '2024-11-15', speed: 4, direction: 180 },
      { date: '2024-11-16', speed: 3, direction: 270 },
      { date: '2024-11-17', speed: 1, direction: 90 },
      { date: '2024-11-18', speed: 2, direction: 45 },
      { date: '2024-11-19', speed: 4, direction: 135 },
      { date: '2024-11-20', speed: 2, direction: 315 },
    ];

    // Directions with labels
    const directionLabels = [
      'N', 'NNE', 'NE', 'ENE',
      'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW',
      'W', 'WNW', 'NW', 'NNW',
    ];

    // Helper: Map directions to labels
    const mapDirectionToLabel = (degree: number): string => {
      const step = 360 / directionLabels.length;
      const index = Math.floor((degree + step / 2) / step) % directionLabels.length;
      return directionLabels[index];
    };

    // Preprocess Data
    const processedData = apiData.map((item) => [
      item.speed,        // Speed (radius)
      item.direction,    // Direction (angle)
      item.date,         // For tooltip
      mapDirectionToLabel(item.direction), // For tooltip
    ]);
    

const option = {
  polar: {},
  angleAxis: {
    type: 'value',
    startAngle: 90, // Adjust start angle to place "N" at the top
    min: 0,
    max: 360,
    splitLine: { show: true },
    splitNumber:16,
    axisLabel: {
      formatter: (degree: number) => mapDirectionToLabel(degree),
      color: 'white',
      interval: 0, // Ensure labels are shown for all intervals
      rotate:0
    },
  },
  radiusAxis: {
    type: 'value',
    min: 0,
    max: 5, // Max speed
    splitNumber: 5,
    axisLabel: {
      formatter: '    {value}',
      color: 'white',
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const [speed, direction, date, label] = params.value;
      const color = speed < 1 ? '#1f77b4' : (speed < 2 ? '#ff7f0e' : '#d62728');
      return `
        <div style="color: ${color}">
          Date: ${date}<br>
          Speed: ${speed} knots<br>
          Direction: ${label} (${direction}°)
        </div>
      `;
    },
  },
  
  series: [
    {
      type: 'custom',
      coordinateSystem: 'polar',
      renderItem: (params: any, api: any) => {
        const radius = api.value(0); // Speed (radius)
        const angle = api.value(1); // Direction
        const index = params.dataIndex; // Data index
      
        const maxRadius = params.coordSys.r; // Maximum radius of the polar coordinate system
        const scaledRadius = (radius / 5) * maxRadius; // Scale radius proportionally (assuming max speed is 5)
      
        const offset = index * 2; // Offset for overlapping bars (adjust as needed)
        const r0 = offset; // Inner radius (start of the sector)
      
        const color = radius < 2 ? '#1f77b4' : radius < 3 ? '#ff7f0e' : '#27D68D';
      
        return {
          type: 'sector',
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r0: r0, // Apply the offset to avoid complete overlap
            r: r0 + scaledRadius, // Outer radius (end of the sector)
            startAngle: (angle - 5) * Math.PI / 180, // Sector start angle
            endAngle: (angle + 5) * Math.PI / 180, // Sector end angle
          },
          style: {
            fill: color,
            opacity: 0.6, // Slight opacity for better visualization
          },
          emphasis: {
            style: {
              opacity: 1, // Full opacity on hover
              shadowBlur: 10, // Optional: Add a glowing effect
              shadowColor: color,
            },
          },
        };
      },
      
      
      
      
      data: processedData,
    },
  ],
  
};

// Apply the chart options
radarChart.setOption(option);

  }
}
