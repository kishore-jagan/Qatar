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
import { HttpClient } from '@angular/common/http';

interface Column {
  field: string;
  header: string;
  unit?: string;
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
  // visible: boolean = false;
  loading: boolean = false;

  sensorData!: BuoyMeasurement[];
  metrological!: Metrological[];
  oceanographic!: [];
  waterQuality!: [];

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

  // selectedoption: boolean = true;
  periodOptions = [
    { label: 'Date Range', value: 'date' },
    { label: 'Weekly', value: 'week' },
    { label: 'Monthly', value: 'month' },
    { label: 'Yearly', value: 'year' },
  ];
  showDate = true;
  selectedPeriod: string = 'date';
  selectedDate: Date = new Date(); // for week/month/year
  fromDateModel: Date = new Date(); // for date range
  toDateModel: Date = new Date(); // for date range
  rangeDates: Date[] = [new Date(), new Date()]; // optional initial values

  fromDate!: string;
  toDate!: string;

  constructor(private reportService: ReportService, private http: HttpClient) {}

  ngOnInit(): void {
    this.onOptionChange();
    // this.setView(this.selectedPeriod);
    // this.fetchDataByDate();

    this.reportService.getAllSensorData().subscribe((data) => {
      this.sensorData = data;
      this.dataSource = this.sensorData;
      console.log('sensorData', this.sensorData);
    });

    // this.reportService.getMetrologicalData().subscribe((data) => {
    //   this.metrological = data;
    //   this.dataSource = this.metrological;
    //   console.log('metrological data ', this.metrological);
    // });
  }

  formatDateTime(date: Date): string {
    return date.toISOString().slice(0, 19); // 'YYYY-MM-DDTHH:mm:ss'
  }

  setView(view: string) {
    this.selectedPeriod = view;

    if (view === 'date') {
      // if (this.fromDateModel && this.toDateModel) {
      //   this.fromDate = this.formatDateTime(
      //     new Date(this.fromDateModel.setHours(0, 0, 0))
      //   );
      //   this.toDate = this.formatDateTime(
      //     new Date(this.toDateModel.setHours(23, 59, 59))
      //   );
      // }
      if (this.rangeDates && this.rangeDates.length === 2) {
        const start = this.rangeDates[0];
        const end = this.rangeDates[1];

        this.fromDate = this.formatDateTime(new Date(start.setHours(0, 0, 0)));
        this.toDate = this.formatDateTime(new Date(end.setHours(23, 59, 59)));

        this.fetchDataByDate();
      }
    } else if (view === 'week') {
      if (this.selectedDate) {
        const startOfWeek = new Date(this.selectedDate);
        startOfWeek.setHours(0, 0, 0, 0);

        const weekEndDate = this.getWeekEndDate(startOfWeek);

        this.fromDate = this.formatDateTime(startOfWeek);
        this.toDate = this.formatDateTime(weekEndDate);

        this.fetchDataByDate();
      } else {
        console.warn('No week selected');
      }
    } else if (view === 'month') {
      const d = new Date(this.selectedDate);
      const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
      const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);

      this.fromDate = this.formatDateTime(new Date(firstDay.setHours(0, 0, 0)));
      this.toDate = this.formatDateTime(new Date(lastDay.setHours(23, 59, 59)));
    } else if (view === 'year') {
      const d = new Date(this.selectedDate);
      const firstDay = new Date(d.getFullYear(), 0, 1);
      const lastDay = new Date(d.getFullYear(), 11, 31);

      this.fromDate = this.formatDateTime(new Date(firstDay.setHours(0, 0, 0)));
      this.toDate = this.formatDateTime(new Date(lastDay.setHours(23, 59, 59)));
    }

    this.fetchDataByDate();
  }

  fetchDataByDate() {
    if (!this.fromDate || !this.toDate) {
      console.warn('fromDate or toDate is missing');
    }

    this.reportService.fetchDataByDate(this.fromDate, this.toDate).subscribe(
      (data) => {
        console.log('Filtered data by date:', data);
        this.sensorData = data;
      },
      (error) => {
        console.error('Error fetching data by date:', error);
      }
    );
  }

  getWeekEndDate(startDate: Date): Date {
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Add 6 days to get the week end
    endDate.setHours(23, 59, 59, 999);
    return endDate;
  }

  // onDateChange(event: any) {
  //   const d = new Date(this.selectedDate);
  //   this.fromDate = this.formatDateTime(new Date(d.setHours(0, 0, 0)));
  //   this.toDate = this.formatDateTime(new Date(d.setHours(23, 59, 59)));
  //   this.fetchDataByDate();
  // }

  // setOption(option: string) {
  //   this.selectedOption = option;
  //   console.log('Selected:', this.selectedOption);
  // }

  onSearch(query: string, dt: any): void {
    this.searchQuery = query;
    dt.filterGlobal(query, 'contains');
  }

  highlightSearchText(value: any): string {
    if (!this.searchQuery) return value;

    // Ensure the value is treated as a string
    const stringValue =
      value !== null && value !== undefined ? String(value) : '';
    const escapedSearchQuery = this.searchQuery.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      '\\$&'
    );
    const regex = new RegExp(`(${escapedSearchQuery})`, 'gi');
    return stringValue.replace(regex, '<span class="highlight">$1</span>');
  }

  rowMatchesSearch(rowData: any, columns: any[]): boolean {
    if (!this.searchQuery) return false;

    const search = this.searchQuery.toLowerCase();

    return columns.some((col) => {
      const value = rowData[col.field];
      return (
        value !== null &&
        value !== undefined &&
        String(value).toLowerCase().includes(search)
      );
    });
  }

  onOptionChange(): void {
    if (this.selectedOption === 'sensorData') {
      this.dataSource = this.sensorData;
      this.dynaColumns = [
        // { field: 'id', header: 'ID', unit: '' },
        // { field: 'timestamp', header: 'Timestamp', unit: '' },
        { field: 'record', header: 'Record', unit: '' },
        { field: 'battv_min', header: 'Battery Voltage', unit: 'V' },
        { field: 'ptemp_c_max', header: 'Platform Temp Max', unit: '°C' },
        { field: 'datatim', header: 'Data Time', unit: '' },
        { field: 'avg_ws', header: 'Wind Speed', unit: 'm/s' },
        { field: 'avgwindr', header: 'Wind Direction', unit: '°' },
        { field: 'windgust', header: 'Wind Gust', unit: 'm/s' },
        { field: 'avgtemp', header: 'Temperature', unit: '°C' },
        { field: 'avgrh', header: 'Relative Humidity', unit: '%' },
        { field: 'avgbp', header: 'Barometric Pressure', unit: 'hPa' },
        { field: 'visnm', header: 'Visibility', unit: 'nm' },
        { field: 'avgvisnm', header: 'Average Visibility', unit: 'nm' },
        { field: 'watertempc_avg', header: 'Water Temperature', unit: '°C' },
        { field: 'motion', header: 'Motion', unit: '' },
        { field: 'nmea', header: 'NMEA', unit: '' },
        { field: 'heading', header: 'Heading', unit: '°' },
        { field: 'hs', header: 'Significant Wave Height', unit: 'm' },
        {
          field: 'dominanttimeperiod',
          header: 'Dominant Time Period',
          unit: 's',
        },
        {
          field: 'dominanttimeperiodfw',
          header: 'Dominant Time Period',
          unit: 's',
        },
        { field: 'wave_direction', header: 'Wave Direction', unit: '°' },
        { field: 'wave_directionfw', header: 'Wave Direction (FW)', unit: '°' },
        {
          field: 'mean_wave_direction',
          header: 'Mean Wave Direction',
          unit: '°',
        },
        { field: 'hmax', header: 'Maximum Wave Height', unit: 'm' },
        { field: 'fourier_coefficient_a1', header: 'Fourier Coefficient A1' },
        { field: 'fourier_coefficient_b1', header: 'Fourier Coefficient B1' },
        { field: 'fourier_coefficient_a2', header: 'Fourier Coefficient A2' },
        { field: 'fourier_coefficient_b2', header: 'Fourier Coefficient B2' },
        { field: 'timeanddate', header: 'Time and Date' },
        { field: 'samplenumber', header: 'Sample Number' },
        { field: 'cell_1_speed', header: 'Cell 1 Speed' },
        { field: 'cell_1_dir', header: 'Cell 1 Direction' },
        { field: 'cell_2_speed', header: 'Cell 2 Speed' },
        { field: 'cell_2_dir', header: 'Cell 2 Direction' },
        { field: 'cell_3_speed', header: 'Cell 3 Speed' },
        { field: 'cell_3_dir', header: 'Cell 3 Direction' },
        { field: 'cell_4_speed', header: 'Cell 4 Speed' },
        { field: 'cell_4_dir', header: 'Cell 4 Direction' },
        { field: 'cell_5_speed', header: 'Cell 5 Speed' },
        { field: 'cell_5_dir', header: 'Cell 5 Direction' },
        { field: 'cell_6_speed', header: 'Cell 6 Speed' },
        { field: 'cell_6_dir', header: 'Cell 6 Direction' },
        { field: 'cell_7_speed', header: 'Cell 7 Speed' },
        { field: 'cell_7_dir', header: 'Cell 7 Direction' },
        { field: 'cell_8_speed', header: 'Cell 8 Speed' },
        { field: 'cell_8_dir', header: 'Cell 8 Direction' },
        { field: 'cell_9_speed', header: 'Cell 9 Speed' },
        { field: 'cell_9_dir', header: 'Cell 9 Direction' },
        { field: 'cell_10_speed', header: 'Cell 10 Speed' },
        { field: 'cell_10_dir', header: 'Cell 10 Direction' },
        { field: 'cell_11_speed', header: 'Cell 11 Speed' },
        { field: 'cell_11_dir', header: 'Cell 11 Direction' },
        { field: 'cell_12_speed', header: 'Cell 12 Speed' },
        { field: 'cell_12_dir', header: 'Cell 12 Direction' },
        { field: 'cell_13_speed', header: 'Cell 13 Speed' },
        { field: 'cell_13_dir', header: 'Cell 13 Direction' },
        { field: 'cell_14_speed', header: 'Cell 14 Speed' },
        { field: 'cell_14_dir', header: 'Cell 14 Direction' },
        { field: 'cell_15_speed', header: 'Cell 15 Speed' },
        { field: 'cell_15_dir', header: 'Cell 15 Direction' },
        { field: 'cell_16_speed', header: 'Cell 16 Speed' },
        { field: 'cell_16_dir', header: 'Cell 16 Direction' },
        { field: 'cell_17_speed', header: 'Cell 17 Speed' },
        { field: 'cell_17_dir', header: 'Cell 17 Direction' },
        { field: 'cell_18_speed', header: 'Cell 18 Speed' },
        { field: 'cell_18_dir', header: 'Cell 18 Direction' },
        { field: 'cell_19_speed', header: 'Cell 19 Speed' },
        { field: 'cell_19_dir', header: 'Cell 19 Direction' },
        { field: 'cell_20_speed', header: 'Cell 20 Speed' },
        { field: 'cell_20_dir', header: 'Cell 20 Direction' },
      ];
      this.selectedColumns = this.dynaColumns;
      this.globalFilterFields = this.dynaColumns.map((col) => col.field);
      console.log('Allsensordyna', this.globalFilterFields);
    } else if (this.selectedOption === 'metrological') {
      this.dataSource = this.metrological;
      this.dynaColumns = [
        // { field: 'id', header: 'ID' },
        { field: 'avg_ws', header: 'Wind Speed', unit: 'm/s' },
        { field: 'avgwindr', header: 'Wind Direction', unit: '°' },
        { field: 'windgust', header: 'Wind Gust', unit: 'm/s' },
        { field: 'avgtemp', header: 'Temperature', unit: '°C' },
        { field: 'avgrh', header: 'Relative Humidity', unit: '%' },
        { field: 'avgbp', header: 'Barometric Pressure', unit: 'hPa' },
        { field: 'visnm', header: 'Visibility', unit: 'nm' },
        { field: 'avgvisnm', header: 'Average Visibility', unit: 'nm' },
        { field: 'ptemp_c_max', header: 'Platform Temp Max', unit: '°C' },
      ];
      this.selectedColumns = this.dynaColumns;
      this.globalFilterFields = this.dynaColumns.map((col) => col.field);
      console.log('metrological dyna', this.globalFilterFields);
    } else if (this.selectedOption === 'oceanographic') {
      this.dataSource = this.metrological;
      this.dynaColumns = [
        { field: 'motion', header: 'Motion', unit: '' },
        { field: 'heading', header: 'Heading', unit: '°' },
        { field: 'hs', header: 'Significant Wave Height', unit: 'm' },
        {
          field: 'dominanttimeperiod',
          header: 'Dominant Time Period',
          unit: 's',
        },
        {
          field: 'dominanttimeperiodfw',
          header: 'Dominant Time Period',
          unit: 's',
        },
        { field: 'wave_direction', header: 'Wave Direction', unit: '°' },
        { field: 'wave_directionfw', header: 'Wave Direction (FW)', unit: '°' },
        {
          field: 'mean_wave_direction',
          header: 'Mean Wave Direction',
          unit: '°',
        },
        { field: 'hmax', header: 'Maximum Wave Height', unit: 'm' },
        { field: 'fourier_coefficient_a1', header: 'Fourier Coefficient A1' },
        { field: 'fourier_coefficient_b1', header: 'Fourier Coefficient B1' },
        { field: 'fourier_coefficient_a2', header: 'Fourier Coefficient A2' },
        { field: 'fourier_coefficient_b2', header: 'Fourier Coefficient B2' },
        { field: 'cell_1_speed', header: 'Cell 1 Speed' },
        { field: 'cell_1_dir', header: 'Cell 1 Direction' },
        { field: 'cell_2_speed', header: 'Cell 2 Speed' },
        { field: 'cell_2_dir', header: 'Cell 2 Direction' },
        { field: 'cell_3_speed', header: 'Cell 3 Speed' },
        { field: 'cell_3_dir', header: 'Cell 3 Direction' },
        { field: 'cell_4_speed', header: 'Cell 4 Speed' },
        { field: 'cell_4_dir', header: 'Cell 4 Direction' },
        { field: 'cell_5_speed', header: 'Cell 5 Speed' },
        { field: 'cell_5_dir', header: 'Cell 5 Direction' },
        { field: 'cell_6_speed', header: 'Cell 6 Speed' },
        { field: 'cell_6_dir', header: 'Cell 6 Direction' },
        { field: 'cell_7_speed', header: 'Cell 7 Speed' },
        { field: 'cell_7_dir', header: 'Cell 7 Direction' },
        { field: 'cell_8_speed', header: 'Cell 8 Speed' },
        { field: 'cell_8_dir', header: 'Cell 8 Direction' },
        { field: 'cell_9_speed', header: 'Cell 9 Speed' },
        { field: 'cell_9_dir', header: 'Cell 9 Direction' },
        { field: 'cell_10_speed', header: 'Cell 10 Speed' },
        { field: 'cell_10_dir', header: 'Cell 10 Direction' },
        { field: 'cell_11_speed', header: 'Cell 11 Speed' },
        { field: 'cell_11_dir', header: 'Cell 11 Direction' },
        { field: 'cell_12_speed', header: 'Cell 12 Speed' },
        { field: 'cell_12_dir', header: 'Cell 12 Direction' },
        { field: 'cell_13_speed', header: 'Cell 13 Speed' },
        { field: 'cell_13_dir', header: 'Cell 13 Direction' },
        { field: 'cell_14_speed', header: 'Cell 14 Speed' },
        { field: 'cell_14_dir', header: 'Cell 14 Direction' },
        { field: 'cell_15_speed', header: 'Cell 15 Speed' },
        { field: 'cell_15_dir', header: 'Cell 15 Direction' },
        { field: 'cell_16_speed', header: 'Cell 16 Speed' },
        { field: 'cell_16_dir', header: 'Cell 16 Direction' },
        { field: 'cell_17_speed', header: 'Cell 17 Speed' },
        { field: 'cell_17_dir', header: 'Cell 17 Direction' },
        { field: 'cell_18_speed', header: 'Cell 18 Speed' },
        { field: 'cell_18_dir', header: 'Cell 18 Direction' },
        { field: 'cell_19_speed', header: 'Cell 19 Speed' },
        { field: 'cell_19_dir', header: 'Cell 19 Direction' },
        { field: 'cell_20_speed', header: 'Cell 20 Speed' },
        { field: 'cell_20_dir', header: 'Cell 20 Direction' },
      ];
      this.selectedColumns = this.dynaColumns;
      this.globalFilterFields = this.dynaColumns.map((col) => col.field);
      console.log('oceanographic dyna', this.globalFilterFields);
    } else if (this.selectedOption === 'waterQuality') {
      // this.dataSource = this.metrological;
      this.dynaColumns = [
        { field: 'watertempc_avg', header: 'Water Temperature', unit: '°C' },
      ];
      this.selectedColumns = this.dynaColumns;
      this.globalFilterFields = this.dynaColumns.map((col) => col.field);
      console.log('waterQuality dyna', this.globalFilterFields);
    }
  }
}
