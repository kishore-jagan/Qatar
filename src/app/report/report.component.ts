import { Component, EventEmitter, OnInit } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TableModule } from 'primeng/table';
import { FileUpload } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BuoyMeasurement, Metrological, ReportService } from './report.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    DrawerModule,
    TableModule,
    MultiSelectModule,
    FileUpload,
    Select,
    DatePickerModule,
    SelectButtonModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  providers: [ReportService],
})
export class ReportComponent implements OnInit {
  visible: boolean = false;
  loading: boolean = false;

  sensorData!: BuoyMeasurement[];
  metrological!: Metrological[];

  dynaColumns!: Column[];
  selectedColumns!: Column[];
  globalFilterFields!: string[];
  searchQuery: string = '';

  selectedOption: string = 'sensorData';
  options = [
    { label: 'All Sensors', value: 'sensorData', icon: 'pi pi-database' },
    { label: 'Metrological', value: 'metrological', icon: 'pi pi-cloud' },
    { label: 'Oceanographic', value: 'oceanographic', icon: 'pi pi-globe' },
    { label: 'WaterQuality', value: 'waterQuality', icon: 'pi pi-umbrella' },
  ];
  dataSource: BuoyMeasurement[] | Metrological[] = [];

  selectedoption: boolean = true;

  viewOptions = [
    { label: 'Date Range', value: 'date' },
    { label: 'Weekly', value: 'week' },
    { label: 'Monthly', value: 'month' },
    { label: 'Yearly', value: 'year' },
  ];
  currentView = 'date';
  showDate = true;
  selectedDate: Date = new Date();

  setView(view: string) {
    this.currentView = view;
    this.showDate = !this.showDate;

    if (view === 'week') {
      const today = new Date();
      const firstDayOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      this.selectedDate = firstDayOfWeek;
    } else if (view === 'month') {
      this.selectedDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
    } else if (view === 'year') {
      this.selectedDate = new Date(new Date().getFullYear(), 0, 1);
    } else {
      this.selectedDate = new Date();
    }
  }

  onDateChange(event: any) {
    this.showDate = false;
    console.log('Selected Date:', this.selectedDate);
  }

  setOption(option: string) {
    this.selectedOption = option;
    console.log('Selected:', this.selectedOption);
  }

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.onOptionChange();

    this.reportService.getAllSensorData().subscribe((data) => {
      this.sensorData = data;
      this.dataSource = this.sensorData;
      console.log('sensorData', this.sensorData);
    });

    this.reportService.getMetrologicalData().subscribe((data) => {
      this.metrological = data;
      this.dataSource = this.metrological;
      console.log('metrological', this.metrological);
    });
  }

  onSearch(query: string, dt: any): void {
    this.searchQuery = query;
    dt.filterGlobal(query, 'contains');
  }

  onOptionChange(): void {
    if (this.selectedOption === 'sensorData') {
      this.dataSource = this.sensorData;
      this.dynaColumns = [
        { field: 'avg_ws', header: 'AVG WS' },
        { field: 'avgbp', header: 'AVG BP' },
        { field: 'avgrh', header: 'AVG RH' },
        { field: 'avgtemp', header: 'AVG TEMP' },
        { field: 'avgvisnm', header: 'AVG VIS NM' },
        { field: 'avgwindr', header: 'AVG WIND R' },
        { field: 'battv_min', header: 'BATTV MIN' },
        { field: 'cell_1_dir', header: 'CELL 1 DIR' },
        { field: 'cell_1_speed', header: 'CELL 1 SPEED' },
        { field: 'cell_2_dir', header: 'CELL 2 DIR' },
        { field: 'cell_2_speed', header: 'CELL 2 SPEED' },
        { field: 'cell_3_dir', header: 'CELL 3 DIR' },
        { field: 'cell_3_speed', header: 'CELL 3 SPEED' },
        { field: 'cell_4_dir', header: 'CELL 4 DIR' },
        { field: 'cell_4_speed', header: 'CELL 4 SPEED' },
        { field: 'cell_5_dir', header: 'CELL 5 DIR' },
        { field: 'cell_5_speed', header: 'CELL 5 SPEED' },
        { field: 'cell_6_dir', header: 'CELL 6 DIR' },
        { field: 'cell_6_speed', header: 'CELL 6 SPEED' },
        { field: 'cell_7_dir', header: 'CELL 7 DIR' },
        { field: 'cell_7_speed', header: 'CELL 7 SPEED' },
        { field: 'cell_8_dir', header: 'CELL 8 DIR' },
        { field: 'cell_8_speed', header: 'CELL 8 SPEED' },
        { field: 'cell_9_dir', header: 'CELL 9 DIR' },
        { field: 'cell_9_speed', header: 'CELL 9 SPEED' },
        { field: 'cell_10_dir', header: 'CELL 10 DIR' },
        { field: 'cell_10_speed', header: 'CELL 10 SPEED' },
        { field: 'cell_11_dir', header: 'CELL 11 DIR' },
        { field: 'cell_11_speed', header: 'CELL 11 SPEED' },
        { field: 'cell_12_dir', header: 'CELL 12 DIR' },
        { field: 'cell_12_speed', header: 'CELL 12 SPEED' },
        { field: 'cell_13_dir', header: 'CELL 13 DIR' },
        { field: 'cell_13_speed', header: 'CELL 13 SPEED' },
        { field: 'cell_14_dir', header: 'CELL 14 DIR' },
        { field: 'cell_14_speed', header: 'CELL 14 SPEED' },
        { field: 'cell_15_dir', header: 'CELL 15 DIR' },
        { field: 'cell_15_speed', header: 'CELL 15 SPEED' },
        { field: 'cell_16_dir', header: 'CELL 16 DIR' },
        { field: 'cell_16_speed', header: 'CELL 16 SPEED' },
        { field: 'cell_17_dir', header: 'CELL 17 DIR' },
        { field: 'cell_17_speed', header: 'CELL 17 SPEED' },
        { field: 'cell_18_dir', header: 'CELL 18 DIR' },
        { field: 'cell_18_speed', header: 'CELL 18 SPEED' },
        { field: 'cell_19_dir', header: 'CELL 19 DIR' },
        { field: 'cell_19_speed', header: 'CELL 19 SPEED' },
        { field: 'cell_20_dir', header: 'CELL 20 DIR' },
        { field: 'cell_20_speed', header: 'CELL 20 SPEED' },
        { field: 'datatim', header: 'DATA TIME' },
        { field: 'dominanttimeperiod', header: 'DOMINANT TIME PERIOD' },
        { field: 'dominanttimeperiodfw', header: 'DOMINANT TIME PERIOD FW' },
        { field: 'fourier_coefficient_a1', header: 'FOURIER COEFFICIENT A1' },
        { field: 'fourier_coefficient_a2', header: 'FOURIER COEFFICIENT A2' },
        { field: 'fourier_coefficient_b1', header: 'FOURIER COEFFICIENT B1' },
        { field: 'fourier_coefficient_b2', header: 'FOURIER COEFFICIENT B2' },
        { field: 'heading', header: 'HEADING' },
        { field: 'hmax', header: 'HMAX' },
        { field: 'hs', header: 'HS' },
        { field: 'id', header: 'ID' },
        { field: 'mean_wave_direction', header: 'MEAN WAVE DIRECTION' },
        { field: 'motion', header: 'MOTION' },
        { field: 'nmea', header: 'NMEA' },
        { field: 'ptemp_c_max', header: 'PTEMP C MAX' },
        { field: 'record', header: 'RECORD' },
        { field: 'samplenumber', header: 'SAMPLE NUMBER' },
        { field: 'timeanddate', header: 'TIME AND DATE' },
        { field: 'timestamp', header: 'TIMESTAMP' },
        { field: 'visnm', header: 'VIS NM' },
        { field: 'watertempc_avg', header: 'WATER TEMP C AVG' },
        { field: 'wave_direction', header: 'WAVE DIRECTION' },
        { field: 'wave_directionfw', header: 'WAVE DIRECTION FW' },
        { field: 'windgust', header: 'WIND GUST' },
      ];
      this.selectedColumns = this.dynaColumns;
      this.globalFilterFields = this.dynaColumns.map((col) => col.field);
      console.log('qwdhbksdbx', this.dataSource);
    } else if (this.selectedOption === 'metrological') {
      this.dataSource = this.metrological;
      this.dynaColumns = [
        { field: 'id', header: 'ID' },
        { field: 'avg_ws', header: 'AVG WS' },
        { field: 'battv_min', header: 'BATTV MIN' },
        { field: 'datatim', header: 'DATA TIME' },
        { field: 'ptemp_c_max', header: 'PTEMP C MAX' },
        { field: 'record', header: 'RECORD' },
        { field: 'timestamp', header: 'TIMESTAMP' },
        { field: 'windgust', header: 'WIND GUST' },
      ];
      this.selectedColumns = this.dynaColumns;
      this.globalFilterFields = this.dynaColumns.map((col) => col.field);
      console.log('abcd', this.dataSource);
    }
  }
}
