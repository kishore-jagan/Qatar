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
import { ReportService } from '../report/report.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, InfobuoyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [InfobuoyComponent, StationconfigService, ReportService],
})
export class HomeComponent implements OnInit {
  mapInitialized = false;
  map!: Map | undefined;
  livelocationbuoy1: [number, number] = [51.563944, 25.423528];
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

  centerbuoy1: [number, number] = [51.562944, 25.423028];
  centerbuoy2!: [number, number];
  centerbuoy3!: [number, number];
  centerbuoy4!: [number, number];
  centerbuoy5!: [number, number];

  imageMarker1!: string;
  imageMarker2!: string;
  imageMarker3!: string;
  imageMarker4!: string;
  imageMarker5!: string;

  statusText1!: string;
  statusText2!: string;
  statusText3!: string;
  statusText4!: string;
  statusText5!: string;

  buoy1range = '';
  buoy2range = '';
  buoy3range = '';
  buoy4range = '';
  buoy5range = '';

  buoyTapped: boolean = false;
  selectedBuoy!: string;

  battery!: number;
  temp!: string;

  buoy1Drift!: string;
  buoy2Drift!: string;
  buoy3Drift!: string;
  buoy4Drift!: string;
  buoy5Drift!: string;

  id1!: string;
  id2!: string;
  id3!: string;
  id4!: string;
  id5!: string;

  buoys: any[] = [];

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
    private infobuoy: InfobuoyComponent,
    private reportService: ReportService
  ) {}
  ngOnInit(): void {
    this.reportService.getAllSensorData().subscribe((report) => {
      // console.log('report', report);
      if (report && report.length > 0) {
        const latest = report[report.length - 1];
        this.battery = latest.battv_min;
        this.temp = latest.avgtemp.toString();
      }
    });
    this.stationConfig.getStationNames().subscribe((stationConfig) => {
      this.id1 = stationConfig[0].station_id;
      this.id2 = stationConfig[1].station_id;
      this.id3 = stationConfig[2].station_id;
      this.id4 = stationConfig[3].station_id;
      this.id5 = stationConfig[4].station_id;
      console.log('id1', this.id1);
      console.log('id2', this.id2);
      console.log('id3', this.id3);
      console.log('id4', this.id4);
      console.log('id5', this.id5);
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

      this.statusText1 =
        stationConfig[0].status === 'active' ? 'Online' : 'Offline';
      this.statusText2 =
        stationConfig[1].status === 'active' ? 'Online' : 'Offline';
      this.statusText3 =
        stationConfig[2].status === 'active' ? 'Online' : 'Offline';
      this.statusText4 =
        stationConfig[3].status === 'active' ? 'Online' : 'Offline';
      this.statusText5 =
        stationConfig[4].status === 'active' ? 'Online' : 'Offline';

      const result1 = this.haversineDistanceAndDirection(
        // this.centerbuoy1,
        // this.livelocationbuoy1
        [stationConfig[0].lon_dd, stationConfig[0].lat_dd],
        [stationConfig[0].lon_dd, stationConfig[0].lat_dd]
      );
      this.buoy1Drift = `${result1.distance.toFixed(2)} m ${result1.direction}`;
      console.log(
        'Buoy1 Drift:',
        result1.distance.toFixed(2),
        'm',
        result1.direction
      );

      const result2 = this.haversineDistanceAndDirection(
        [stationConfig[1].lon_dd, stationConfig[1].lat_dd],
        [stationConfig[1].lon_dd, stationConfig[1].lat_dd]
      );
      this.buoy2Drift = `${result2.distance.toFixed(2)} m ${result2.direction}`;

      const result3 = this.haversineDistanceAndDirection(
        [stationConfig[2].lon_dd, stationConfig[2].lat_dd],
        [stationConfig[2].lon_dd, stationConfig[2].lat_dd]
      );
      this.buoy3Drift = `${result3.distance.toFixed(2)} m ${result3.direction}`;

      const result4 = this.haversineDistanceAndDirection(
        [stationConfig[3].lon_dd, stationConfig[3].lat_dd],
        [stationConfig[3].lon_dd, stationConfig[3].lat_dd]
      );
      this.buoy4Drift = `${result4.distance.toFixed(2)} m ${result4.direction}`;

      const result5 = this.haversineDistanceAndDirection(
        [stationConfig[4].lon_dd, stationConfig[4].lat_dd],
        [stationConfig[4].lon_dd, stationConfig[4].lat_dd]
      );
      this.buoy5Drift = `${result5.distance.toFixed(2)} m ${result5.direction}`;

      this.buoys = [
        {
          id: 'B_ID1',
          name: this.stationName1,
          lat: this.buoy1lat,
          long: this.buoy1long,
          status: this.statusText1,
          drift: this.buoy1Drift,
        },
        {
          id: 'B_ID2',
          name: this.stationName2,
          lat: this.buoy2lat,
          long: this.buoy2long,
          status: this.statusText2,
          drift: this.buoy2Drift,
        },
        {
          id: 'B_ID3',
          name: this.stationName3,
          lat: this.buoy3lat,
          long: this.buoy3long,
          status: this.statusText3,
          drift: this.buoy3Drift,
        },
        {
          id: 'B_ID4',
          name: this.stationName4,
          lat: this.buoy4lat,
          long: this.buoy4long,
          status: this.statusText4,
          drift: this.buoy4Drift,
        },
        {
          id: 'B_ID5',
          name: this.stationName5,
          lat: this.buoy5lat,
          long: this.buoy5long,
          status: this.statusText5,
          drift: this.buoy5Drift,
        },
      ];

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
        14,
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
      });
      // const mapInstance = this.mapService.map;
      // mapInstance.on('click', () => {
      //   this.selectedBuoy = null;
      // });
    }
  }

  expandMap(event: MouseEvent) {
    this.buoyTapped = false;
    event.stopPropagation();
    const mapContainer = document.getElementById('ol-map') as HTMLElement;
    const isExpanded = mapContainer.classList.toggle('expanded');
    // if (isExpanded) {
    //   mapContainer.style.width = '50%';
    // } else {
    //   mapContainer.style.width = '100%';
    // }
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

  getSelectedId(): string {
    switch (this.selectedBuoy) {
      case this.stationName1:
        return this.id1;
      case this.stationName2:
        return this.id2;
      case this.stationName3:
        return this.id3;
      case this.stationName4:
        return this.id4;
      case this.stationName5:
        return this.id5;
      default:
        return '';
    }
  }

  getSelectedMarker(): string {
    switch (this.selectedBuoy) {
      case this.stationName1:
        return this.statusText1;
      case this.stationName2:
        return this.statusText2;
      case this.stationName3:
        return this.statusText3;
      case this.stationName4:
        return this.statusText4;
      case this.stationName5:
        return this.statusText5;
      default:
        return '';
    }
  }

  getSelectedStatusImg(): string {
    switch (this.selectedBuoy) {
      case this.stationName1:
        return this.statusText1 === 'Online'
          ? '../../../../assets/home/active.png'
          : '../../../../assets/home/inactive.jpg';
      case this.stationName2:
        return this.statusText2 === 'Online'
          ? '../../../../assets/home/active.png'
          : '../../../../assets/home/inactive.jpg';
      case this.stationName3:
        return this.statusText3 === 'Online'
          ? '../../../../assets/home/active.png'
          : '../../../../assets/home/inactive.jpg';
      case this.stationName4:
        return this.statusText4 === 'Online'
          ? '../../../../assets/home/active.png'
          : '../../../../assets/home/inactive.jpg';
      case this.stationName5:
        return this.statusText5 === 'Online'
          ? '../../../../assets/home/active.png'
          : '../../../../assets/home/inactive.jpg';
      default:
        return '';
    }
  }

  getSelectedLat(): number {
    switch (this.selectedBuoy) {
      case this.stationName1:
        return this.buoy1lat;
      case this.stationName2:
        return this.buoy2lat;
      case this.stationName3:
        return this.buoy3lat;
      case this.stationName4:
        return this.buoy4lat;
      case this.stationName5:
        return this.buoy5lat;
      default:
        return 0;
    }
  }

  getSelectedLong(): number {
    switch (this.selectedBuoy) {
      case this.stationName1:
        return this.buoy1long;
      case this.stationName2:
        return this.buoy2long;
      case this.stationName3:
        return this.buoy3long;
      case this.stationName4:
        return this.buoy4long;
      case this.stationName5:
        return this.buoy5long;
      default:
        return 0;
    }
  }

  getSelectedDrift(): string {
    switch (this.selectedBuoy) {
      case this.stationName1:
        return this.buoy1Drift;
      case this.stationName2:
        return this.buoy2Drift;
      case this.stationName3:
        return this.buoy3Drift;
      case this.stationName4:
        return this.buoy4Drift;
      case this.stationName5:
        return this.buoy5Drift;
      default:
        return 'Drift data not available';
    }
  }

  @HostListener('document:click', ['$event'])
  onclickOutside(event: MouseEvent) {
    const infobuoyElement = document.querySelector('app-infobuoy');
    // const expandSpace = document.querySelector('.expand-space');
    const expandButton = document.querySelector('.expand-button');

    const target = event.target as Node;

    // Prevent closing if clicking inside app-infobuoy
    if (infobuoyElement && infobuoyElement.contains(target)) {
      return;
    }

    // Prevent closing if clicking inside expand space or the expand button
    if (expandButton && expandButton.contains(target)) {
      return;
    }

    // Close info buoy
    this.buoyTapped = false;

    // Collapse map if open
    const mapContainer = document.getElementById('ol-map') as HTMLElement;
    mapContainer?.classList.remove('expanded');
    mapContainer!.style.width = '100%';
  }
}
