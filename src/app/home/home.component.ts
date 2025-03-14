import { Component, HostListener, OnInit } from '@angular/core';
import { Map } from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import { MapService } from './homeService/map.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  StationConfigs,
  StationconfigService,
} from './homeService/stationconfig.service';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol/render/webgl/MixedGeometryBatch';
import { InfobuoyComponent } from '../home/infobuoy/infobuoy.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, InfobuoyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [InfobuoyComponent, StationconfigService],
})
export class HomeComponent implements OnInit {
  stations = [
    {
      name: 'Station 1',
      lat: '80.178118',
      long: '14.607975',
      status: 'Online',
      battery: '90%',
    },
    {
      name: 'Station 2',
      lat: '80.178118',
      long: '14.607975',
      status: 'Online',
      battery: '30%',
    },
    {
      name: 'Station 3',
      lat: '80.178118',
      long: '14.607975',
      status: 'Offline',
      battery: '40%',
    },
    {
      name: 'Station 4',
      lat: '80.178118',
      long: '14.607975',
      status: 'Online',
      battery: '80%',
    },
    {
      name: 'Station 5',
      lat: '80.178118',
      long: '14.607975',
      status: 'Offline',
      battery: '80%',
    },
  ];
  lat!: number;
  long!: number;
  buoyDrift!: string;
  mapInitialized = false;
  map!: Map | undefined;
  livelocationbuoy1!: [number, number];
  buoy1wrange: number = 50;
  buoy1drange: number = 100;
  stationName1!: string;
  imageMarker1!: string;
  buoy1range = '';
  buoy2range = '';
  selectedBuoy!: string | null;
  buoy1: [number, number] = fromLonLat([80.178118, 14.607975]) as [
    number,
    number
  ];
  buoy2: [number, number] = fromLonLat([80.178118, 14.607975]) as [
    number,
    number
  ];

  private mapTarget = 'ol-map';
  mapUrl = 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';

  mapChange(name: String) {
    switch (name) {
      case 'OpenCycleMap':
        this.mapUrl = 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
        break;
      case 'Transport':
        this.mapUrl = 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}';
        break;
      case 'Landscape':
        this.mapUrl = 'http://mt0.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}';
        break;
      case 'Outdoors':
        this.mapUrl = 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}';
        break;
      case 'TransportDark':
        this.mapUrl = 'http://mt0.google.com/vt/lyrs=t&hl=en&x={x}&y={y}&z={z}';
        break;
      case 'Spinal Map':
        this.mapUrl = 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}';
        break;
      default:
        this.mapUrl = 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
        break;
    }
    this.mapService.updateMapLayer(this.mapUrl);
  }
  constructor(
    private mapService: MapService,
    private stationConfig: StationconfigService,
    private infobuoy: InfobuoyComponent
  ) {}
  ngOnInit(): void {
    this.stationConfig.getStationNames().subscribe((stationConfig) => {
      this.livelocationbuoy1 = fromLonLat([
        stationConfig[0].lon_dd,
        stationConfig[0].lat_dd,
      ]) as [number, number];
      console.log('live location', toLonLat(this.livelocationbuoy1));
      this.buoy1wrange = stationConfig[0].warning;
      this.buoy1drange = stationConfig[0].danger;
      this.lat = stationConfig[0].lat_dd;
      this.long = stationConfig[0].lon_dd;
      console.log('warning range', this.buoy1wrange);
      console.log('danger range', this.buoy1drange);
      const status = this.coordassign(stationConfig);
      this.imageMarker1 = status
        ? '../../assets/home/buoy.png'
        : '../../assets/home/buoy_offline.png';
      if (this.imageMarker1 != null) {
        if (status && !this.map) {
          //console.log("ok");
          this.MapInit();
        }
      }
    });
    // this.MapInit();

    const result = this.haversineDistanceAndDirection();
    console.log('Result:', result); // Add this line for debugging
    this.buoyDrift = `${result.distance} meters ${result.direction} `;
  }

  coordassign(configs: StationConfigs[]): boolean {
    // Assign station names
    this.stationName1 = configs[0].station_name;
    console.log('station name', configs);
    // Function to convert DMS to Decimal Degrees
    const convertDMSToDD = (deg: number, min: number, sec: number): number => {
      return deg + min / 60 + sec / 3600;
    };

    // Helper function to assign locations based on geo_format
    const assignLocation = (config: StationConfigs): [number, number] => {
      if (config.geo_format === 'DMS') {
        return fromLonLat([
          convertDMSToDD(config.lon_deg, config.lon_min, config.lon_sec),
          convertDMSToDD(config.lat_deg, config.lat_min, config.lat_sec),
        ]) as [number, number];
      } else if (config.geo_format === 'DD') {
        console.log('dd');

        return fromLonLat([config.lon_dd, config.lat_dd]) as [number, number];
      } else {
        //console.error("Unknown geo_format encountered:", config.geo_format);
        return [0, 0]; // Return a default value or handle as needed
      }
    };

    // Assign buoy locations
    this.buoy1 = assignLocation(configs[0]);
    console.log('buoy1', toLonLat(this.buoy1));
    // this.buoy2 = assignLocation(configs[1]);

    // Log buoy locations for debugging

    // If all went well, return true
    return true;
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }

  vectorSource!: VectorSource;
  MapInit(): void {
    if (!this.mapInitialized) {
      this.mapService.initializeMap(
        this.mapTarget,
        this.buoy1,
        15,
        this.mapUrl
      );
      this.mapService.addMarker(
        this.livelocationbuoy1,
        this.stationName1,
        this.imageMarker1
      );
      this.mapService.addCircle(this.buoy1, this.buoy1drange, 'red');
      this.mapService.addCircle(this.buoy1, this.buoy1wrange, 'yellow');
      this.buoy1range = this.mapService.checkBuoyRange(
        this.livelocationbuoy1,
        this.buoy1,
        this.buoy1wrange,
        this.buoy1drange,
        this.stationName1
      );
      console.log('buoy1range', this.buoy1range);
      this.mapInitialized = true;

      this.mapService.registerClickListener((feature: Feature) => {
        const name = feature.get('name');
        if (name) {
          console.log(`Feature clicked: ${name}`);
          this.selectedBuoy = name;
          this.infobuoy.rotateStation();
        }
      });
      // const mapInstance = this.mapService.map;
      // mapInstance.on('click', () => {
      //   this.selectedBuoy = null;
      // });
    }
  }

  expandMap() {
    const mapContainer = document.getElementById('ol-map') as HTMLElement;
    const isExpanded = mapContainer.classList.toggle('expanded');
    if (isExpanded) {
      // mapContainer.style.width = '50%';
    } else {
      mapContainer.style.width = '100%';
    }
  }

  haversineDistanceAndDirection(
    loc1: [number, number] = [0, 0],
    loc2: [number, number] = [0, 0]
  ): { distance: number; direction: string } {
    const toRadians = (degree: number) => degree * (Math.PI / 180);
    const toDegrees = (radian: number) => radian * (180 / Math.PI);

    const R = 6371e3; // Radius of Earth in meters
    const φ1 = toRadians(loc1[1]);
    const φ2 = toRadians(loc2[1]);
    const Δφ = toRadians(loc2[1] - loc1[1]);
    const Δλ = toRadians(loc2[0] - loc1[0]);

    // Haversine formula to calculate distance
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters

    // Calculate the initial bearing (direction) in radians
    const x = Math.sin(Δλ) * Math.cos(φ2);
    const y =
      Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    let bearing = Math.atan2(x, y);

    // Convert bearing from radians to degrees
    bearing = toDegrees(bearing);

    // Normalize the bearing to be between 0 and 360 degrees
    bearing = (bearing + 360) % 360;

    // Map bearing to cardinal direction
    const directions = [
      { min: 0, max: 22.5, direction: 'N' },
      { min: 22.5, max: 67.5, direction: 'NE' },
      { min: 67.5, max: 112.5, direction: 'E' },
      { min: 112.5, max: 157.5, direction: 'SE' },
      { min: 157.5, max: 202.5, direction: 'S' },
      { min: 202.5, max: 247.5, direction: 'SW' },
      { min: 247.5, max: 292.5, direction: 'W' },
      { min: 292.5, max: 337.5, direction: 'NW' },
      { min: 337.5, max: 360, direction: 'N' },
    ];

    let direction = 'N'; // Default value
    for (const dir of directions) {
      if (bearing >= dir.min && bearing < dir.max) {
        direction = dir.direction;
        break;
      }
    }

    return { distance, direction };
  }

  // @HostListener('document:click', ['$event'])
  // onclickOutside(event: MouseEvent) {
  //   const infobuoyElement = document.querySelector('app-infobuoy');
  //   if (infobuoyElement && !infobuoyElement.contains(event.target as Node)) {
  //     this.selectedBuoy = null;
  //   }
  // }
}
