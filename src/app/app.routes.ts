import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo:'auth'
    },
    {
        path:'auth',
        component:AuthenticationComponent
    },
    {
        path: 'base',
        component: LayoutComponent,
        children:[
            {
                path:'home',
                component: HomeComponent
            },
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'reports',
                component:ReportComponent
            },
            {
                path:'analytics',
                component:AnalyticsComponent
            },
            {
                path:'users',
                component:UsersComponent
            },
            {
                path:'settings',
                component:SettingsComponent
            }
            
        ]
    },
    {
        path:'**',
        redirectTo:'auth'
    }

];
