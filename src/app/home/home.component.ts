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

  buoyDrift!: string;
  mapInitialized = false;
  map!: Map | undefined;
  livelocationbuoy1!: [number, number];
  livelocationbuoy2!: [number, number];
  livelocationbuoy3!: [number, number];
  livelocationbuoy4!: [number, number];
  livelocationbuoy5!: [number, number];
  buoy1wrange: number = 100;
  buoy1drange: number = 200;
  buoy2wrange: number = 100;
  buoy2drange: number = 200;
  buoy3wrange!: number;
  buoy3drange!: number;
  buoy4wrange!: number;
  buoy4drange!: number;
  buoy5wrange!: number;
  buoy5drange!: number;

  buoy1lat!: number;
  buoy1long!: number;
  buoy2lat!: number;
  buoy2long!: number;
  buoy3lat!: number;
  buoy3long!: number;
  buoy4lat!: number;
  buoy4long!: number;
  buoy5lat!: number;
  buoy5long!: number;

  stationName1!: string;
  stationName2!: string;
  stationName3!: string;
  stationName4!: string;
  stationName5!: string;

  centerbuoy1: [number, number] = fromLonLat([80.178118, 14.607975]) as [
    number,
    number
  ];
  centerbuoy2!: [number, number];
  centerbuoy3!: [number, number];
  centerbuoy4!: [number, number];
  centerbuoy5!: [number, number];

  imageMarker1!: string;
  imageMarker2!: string;
  imageMarker3!: string;
  imageMarker4!: string;
  imageMarker5!: string;

  buoy1range = '';
  buoy2range = '';
  buoy3range = '';
  buoy4range = '';
  buoy5range = '';

  buoyTapped: boolean = false;
  selectedBuoy!: string;

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
      this.livelocationbuoy2 = fromLonLat([
        stationConfig[1].lon_dd,
        stationConfig[1].lat_dd,
      ]) as [number, number];
      this.livelocationbuoy3 = fromLonLat([
        stationConfig[2].lon_dd,
        stationConfig[2].lat_dd,
      ]) as [number, number];
      this.livelocationbuoy4 = fromLonLat([
        stationConfig[3].lon_dd,
        stationConfig[3].lat_dd,
      ]) as [number, number];
      this.livelocationbuoy5 = fromLonLat([
        stationConfig[4].lon_dd,
        stationConfig[4].lat_dd,
      ]) as [number, number];
      console.log('live location1', toLonLat(this.livelocationbuoy1));
      console.log('live location2', toLonLat(this.livelocationbuoy2));
      console.log('live location3', toLonLat(this.livelocationbuoy3));
      console.log('live location4', toLonLat(this.livelocationbuoy4));
      console.log('live location5', toLonLat(this.livelocationbuoy5));

      this.buoy1wrange = parseFloat(stationConfig[0].warning);
      this.buoy1drange = parseFloat(stationConfig[0].danger);
      this.buoy2wrange = parseFloat(stationConfig[1].warning);
      this.buoy2drange = parseFloat(stationConfig[1].danger);
      this.buoy3wrange = parseFloat(stationConfig[2].warning);
      this.buoy3drange = parseFloat(stationConfig[2].danger);
      this.buoy4wrange = parseFloat(stationConfig[3].warning);
      this.buoy4drange = parseFloat(stationConfig[3].danger);
      this.buoy5wrange = parseFloat(stationConfig[4].warning);
      this.buoy5drange = parseFloat(stationConfig[4].danger);
      console.log('buoy1 warning range', this.buoy1wrange);
      console.log('buoy1 danger range', this.buoy1drange);
      console.log('buoy2 warning range', this.buoy2wrange);
      console.log('buoy2 danger range', this.buoy2drange);
      console.log('buoy3 warning range', this.buoy3wrange);
      console.log('buoy3 danger range', this.buoy3drange);
      console.log('buoy4 warning range', this.buoy4wrange);
      console.log('buoy4 danger range', this.buoy4drange);
      console.log('buoy5 warning range', this.buoy5wrange);
      console.log('buoy5 danger range', this.buoy5drange);

      this.buoy1lat = stationConfig[0].lat_dd;
      this.buoy1long = stationConfig[0].lon_dd;
      this.buoy2lat = stationConfig[1].lat_dd;
      this.buoy2long = stationConfig[1].lon_dd;
      this.buoy3lat = stationConfig[2].lat_dd;
      this.buoy3long = stationConfig[2].lon_dd;
      this.buoy4lat = stationConfig[3].lat_dd;
      this.buoy4long = stationConfig[3].lon_dd;
      this.buoy5lat = stationConfig[4].lat_dd;
      this.buoy5long = stationConfig[4].lon_dd;

      const status = this.coordassign(stationConfig);

      // this.imageMarker1 = status
      //   ? '../../assets/home/buoy.png'
      //   : '../../assets/home/buoy_offline.png';

      if (this.imageMarker1 != null) {
        if (status && !this.map) {
          console.log('ok');

          this.MapInit();
        }
      }
    });

    const result = this.haversineDistanceAndDirection();
    console.log('BuoyDruftResult:', result);
    this.buoyDrift = `${result.distance} m ${result.direction} `;
  }

  coordassign(configs: StationConfigs[]): boolean {
    // Assign station names
    this.stationName1 = configs[0].station_name;
    this.stationName2 = configs[1].station_name;
    this.stationName3 = configs[2].station_name;
    this.stationName4 = configs[3].station_name;
    this.stationName5 = configs[4].station_name;
    console.log('buoy1range', this.buoy1range);
    console.log('buoy2range', this.buoy2range);
    console.log('buoy3range', this.buoy3range);
    console.log('buoy4range', this.buoy4range);
    console.log('buoy5range', this.buoy5range);
    console.log('All station deatils', configs);
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
    this.centerbuoy1 = assignLocation(configs[0]);
    this.centerbuoy2 = assignLocation(configs[1]);
    this.centerbuoy3 = assignLocation(configs[2]);
    this.centerbuoy4 = assignLocation(configs[3]);
    this.centerbuoy5 = assignLocation(configs[4]);
    console.log('centerbuoy1', toLonLat(this.centerbuoy1));
    console.log('centerbuoy2', toLonLat(this.centerbuoy2));
    console.log('centerbuoy3', toLonLat(this.centerbuoy3));
    console.log('centerbuoy4', toLonLat(this.centerbuoy4));
    console.log('centerbuoy5', toLonLat(this.centerbuoy5));

    this.imageMarker1 =
      configs[0].status === 'active'
        ? '../../assets/home/buoy.png'
        : '../../assets/home/buoy_offline.png';
    this.imageMarker2 =
      configs[1].status === 'active'
        ? '../../assets/home/buoy.png'
        : '../../assets/home/buoy_offline.png';
    this.imageMarker3 =
      configs[2].status === 'active'
        ? '../../assets/home/buoy.png'
        : '../../assets/home/buoy_offline.png';
    this.imageMarker4 =
      configs[3].status === 'active'
        ? '../../assets/home/buoy.png'
        : '../../assets/home/buoy_offline.png';
    this.imageMarker5 =
      configs[4].status === 'active'
        ? '../../assets/home/buoy.png'
        : '../../assets/home/buoy_offline.png';

    return true;
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }

  vectorSource!: VectorSource;
  MapInit(): void {
    console.log('Initializing map...');
    if (!this.mapInitialized) {
      this.mapService.initializeMap(
        this.mapTarget,
        this.centerbuoy4,
        15,
        this.mapUrl
      );
      this.mapService.addMarker(
        this.livelocationbuoy1,
        this.stationName1,
        this.imageMarker1
      );
      this.mapService.addMarker(
        this.livelocationbuoy2,
        this.stationName2,
        this.imageMarker2
      );
      this.mapService.addMarker(
        this.livelocationbuoy3,
        this.stationName3,
        this.imageMarker3
      );
      this.mapService.addMarker(
        this.livelocationbuoy4,
        this.stationName4,
        this.imageMarker4
      );
      this.mapService.addMarker(
        this.livelocationbuoy5,
        this.stationName5,
        this.imageMarker5
      );
      this.mapService.addCircle(this.centerbuoy1, this.buoy1drange, 'red');
      this.mapService.addCircle(this.centerbuoy1, this.buoy1wrange, 'yellow');
      this.mapService.addCircle(this.centerbuoy2, this.buoy2drange, 'red');
      this.mapService.addCircle(this.centerbuoy2, this.buoy2wrange, 'yellow');
      this.mapService.addCircle(this.centerbuoy3, this.buoy3drange, 'red');
      this.mapService.addCircle(this.centerbuoy3, this.buoy3wrange, 'yellow');
      this.mapService.addCircle(this.centerbuoy4, this.buoy4drange, 'red');
      this.mapService.addCircle(this.centerbuoy4, this.buoy4wrange, 'yellow');
      this.mapService.addCircle(this.centerbuoy5, this.buoy5drange, 'red');
      this.mapService.addCircle(this.centerbuoy5, this.buoy5wrange, 'yellow');

      this.buoy1range = this.mapService.checkBuoyRange(
        this.livelocationbuoy1,
        this.centerbuoy1,
        this.buoy1wrange,
        this.buoy1drange,
        this.stationName1
      );
      this.buoy2range = this.mapService.checkBuoyRange(
        this.livelocationbuoy2,
        this.centerbuoy2,
        this.buoy2wrange,
        this.buoy2drange,
        this.stationName2
      );
      this.buoy3range = this.mapService.checkBuoyRange(
        this.livelocationbuoy3,
        this.centerbuoy3,
        this.buoy3wrange,
        this.buoy3drange,
        this.stationName3
      );
      this.buoy4range = this.mapService.checkBuoyRange(
        this.livelocationbuoy4,
        this.centerbuoy4,
        this.buoy4wrange,
        this.buoy4drange,
        this.stationName4
      );
      this.buoy5range = this.mapService.checkBuoyRange(
        this.livelocationbuoy5,
        this.centerbuoy5,
        this.buoy5wrange,
        this.buoy5drange,
        this.stationName5
      );
      // console.log('buoy1range', this.buoy1range);
      // console.log('buoy2range', this.buoy2range);
      // console.log('buoy3range', this.buoy3range);
      // console.log('buoy4range', this.buoy4range);
      // console.log('buoy5range', this.buoy5range);
      this.mapInitialized = true;
      console.log('map initialized');
      this.mapService.registerClickListener((feature: Feature) => {
        this.buoyTapped = false;
        setTimeout(() => {
          const name = feature.get('name');
          if (name) {
            console.log(`Feature clicked: ${name}`);
            this.selectedBuoy = name;
            this.buoyTapped = true;
            this.infobuoy.rotateStation();
          }
        }, 0);
        // this.infobuoy.rotateStation();
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

  @HostListener('document:click', ['$event'])
  onclickOutside(event: MouseEvent) {
    const infobuoyElement = document.querySelector('app-infobuoy');
    if (infobuoyElement && !infobuoyElement.contains(event.target as Node)) {
      // this.selectedBuoy = '';
      this.buoyTapped = false;
    }
  }
}
