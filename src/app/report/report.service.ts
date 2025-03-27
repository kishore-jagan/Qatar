import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BuoyMeasurement {
  id?: number;
  timestamp: string;
  record: number;
  battv_min: number;
  ptemp_c_max: number;
  datatim: string;
  avg_ws: number;
  windgust: number;
  avgwindr: number;
  avgtemp: number;
  avgrh: number;
  avgbp: number;
  visnm: number;
  avgvisnm: number;
  watertempc_avg: number;
  motion: number;
  nmea: string;
  heading: number;
  hs: number;
  dominanttimeperiod: number;
  dominanttimeperiodfw: number;
  wave_direction: number;
  wave_directionfw: number;
  mean_wave_direction: number;
  hmax: number;
  fourier_coefficient_a1: number;
  fourier_coefficient_b1: number;
  fourier_coefficient_a2: number;
  fourier_coefficient_b2: number;
  timeanddate: string;
  samplenumber: number;
  cell_speeds: number[];
  cell_directions: number[];
}

export interface Metrological {
  id?: number;
  timestamp: string;
  record: number;
  battv_min: number;
  ptemp_c_max: number;
  datatim: string;
  avg_ws: number;
  windgust: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getAllSensorData(): Observable<BuoyMeasurement[]> {
    return this.http.get<BuoyMeasurement[]>(`${this.apiUrl}getAllSensorData`);
  }

  getMetrologicalData(): Observable<Metrological[]> {
    return this.http.get<Metrological[]>(`${this.apiUrl}getMetrologicalData`);
  }
}
