import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BuoyComponent } from '../buoy/buoy.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RadarHomeComponent } from '../radar-home/radar-home.component';
import { ReportComponent } from '../report/report.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { UsersComponent } from '../users/users.component';
import { SettingsComponent } from '../settings/settings.component';
// import { BouyInfoComponent } from '../home/bouyinfo/bouy-info/bouy-info.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HomeComponent,
    SidebarComponent,
    ToastrModule,
    RouterModule,
    DashboardComponent,
    ReportComponent,
    AnalyticsComponent,
    UsersComponent,
    SettingsComponent,
    // BouyInfoComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  selectedIndex: number = 0;
  getScreenSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  constructor(private toast: ToastrService) {}
  ngOnInit(): void {
    // const scren = this.getScreenSize();
    this.selectedIndex = 5;
    // this.toast.success(`width: ${scren.width}`, `height: ${scren.height}`);
  }
}
