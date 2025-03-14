declare var anychart: any;


import { Component, input, Input } from '@angular/core';
// import * as anychart from 'anychart';

@Component({
  selector: 'app-wind-gauge',
  imports: [],
  standalone: true,
  templateUrl: './wind-gauge.component.html',
  styleUrl: './wind-gauge.component.css'
})
export class WindGaugeComponent {
  @Input() speed!:number;
  @Input() idd!:string;

  @Input() direction!:number;
  constructor() {}



  ngAfterViewInit(): void {
    this.initializeGauge();
  }

  initializeGauge(): void {
    const gauge = anychart.gauges.circular();

    gauge
      .fill('#171a1f')
      .stroke(null)
      .padding(0)
      .margin(30)
      .startAngle(0)
      .sweepAngle(360);

    gauge
      .axis()
      .labels()
      .padding(3)
      .position('outside')
      .format('{%Value}\u00B0');

    gauge.data([this.direction, this.speed]);

    gauge
      .axis()
      .scale()
      .minimum(0)
      .maximum(360)
      .ticks({ interval: 30 })
      .minorTicks({ interval: 10 });

    gauge
      .axis()
      .fill('#7c868e')
      .startAngle(0)
      .sweepAngle(-360)
      .width(1)
      .ticks({
        type: 'line',
        fill: '#7c868e',
        length: 4,
        position: 'outside'
      });

    gauge
      .axis(1)
      .fill('#7c868e')
      .startAngle(270)
      .radius(40)
      .sweepAngle(180)
      .width(1)
      .ticks({
        type: 'line',
        fill: '#7c868e',
        length: 4,
        position: 'outside'
      });

    gauge
      .axis(1)
      .labels()
      .padding(3)
      .position('outside')
      .format('{%Value} m/s');

    gauge
      .axis(1)
      .scale()
      .minimum(0)
      .maximum(25)
      .ticks({ interval: 5 })
      .minorTicks({ interval: 1 });

    gauge.title().padding(0).margin([0, 0, 10, 0]);

    gauge
      .marker()
      .fill('#64b5f6')
      .stroke(null)
      .size('8%')
      .zIndex(120)
      .radius('97%');

    gauge
      .needle()
      .fill('#1976d2')
      .stroke(null)
      .axisIndex(1)
      .startRadius('6%')
      .endRadius('38%')
      .startWidth('2%')
      .middleWidth(null)
      .endWidth('0');

    gauge.cap().radius('4%').fill('#1976d2').enabled(true).stroke(null);

    const bigTooltipTitleSettings = {
      fontFamily: '\'Verdana\', Helvetica, Arial, sans-serif',
      fontWeight: 'normal',
      fontSize: '3px',
      hAlign: 'left',
      fontColor: '#212121'
    };
    setTimeout(() => {
      const stage = gauge.getStage();
      const elements = stage.getElementsByTagName('path');

      // Iterate over the elements and modify them based on attributes
      for (const element of elements) {
        if (element.getAttribute('data-ac-wrapper-id') === '7') {
          element.setAttribute('fill', '#ff0000');  // Change fill color to red
        }
      }
    }, 1);

    // Set container ID for the chart
    gauge.container(this.idd);

    // Initiate chart drawing
    gauge.draw();
   
  }
}
