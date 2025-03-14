import { Component, OnInit } from '@angular/core';
import { MapService1 } from '../map_service/map.service';
import { RadarHomeComponent } from '../radar-home/radar-home.component';
import { HomeV1ChartComponent } from '../home-v1-chart/home-v1-chart.component';
import { WindGaugeComponent } from '../wind-gauge/wind-gauge.component';
import { BuoyComponent } from '../buoy/buoy.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RadarHomeComponent,
    HomeV1ChartComponent,
    WindGaugeComponent,
    BuoyComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private map: MapService1) {}
  direction1: number = 110;
  direction2: number = 180;
  direction3: number = 250;

  speed1: number = 4;
  speed2: number = 9;
  speed3: number = 15;

  ngOnInit(): void {
    this.map.destroyMap();
    const mapContainer = document.getElementById('ol-map');
    if (mapContainer) {
      // this.map.createMap(mapContainer!, 18.997888,  72.809304);
      // this.map.addPathLines();
    }
  }
}
