import { Component } from '@angular/core';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

@Component({
    selector: 'app-gauge2',
    imports: [NgxEchartsModule], // ✅ Import module here
    templateUrl: './gauge2.component.html',
    styleUrls: ['./gauge2.component.css'],
    providers: [
        {
            provide: NGX_ECHARTS_CONFIG,
            useValue: { echarts: () => import('echarts') }
        }
    ]
})
export class Gauge2Component {
  gaugeOption: any = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure', 
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: 50,
            name: 'SCORE'
          }
        ]
      }
    ]
  };
}
