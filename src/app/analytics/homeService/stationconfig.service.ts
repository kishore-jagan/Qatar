import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface StationConfigs {
  id: number;
  station_id: string;
  station_name: string;
  warning: number;
  danger: number;
  geo_format: string;
  lat_dd: number;
  lat_deg: number;
  lat_min: number;
  lat_sec: number;
  lon_dd: number;
  lon_deg: number;
  lon_min: number;
  lon_sec: number;
}

@Injectable({
  providedIn: 'root',
})
export class StationconfigService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getStationNames(): Observable<StationConfigs[]> {
    return this.http.get<StationConfigs[]>(`${this.apiUrl}getStationConfig`);
  }
}
