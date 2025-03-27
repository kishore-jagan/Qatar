import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-direction1',
    imports: [CommonModule],
    templateUrl: './direction1.component.html',
    styleUrl: './direction1.component.css'
})
export class Direction1Component implements AfterViewInit {
  private root!: am5.Root;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const chartDiv = this.elRef.nativeElement.querySelector('#chartdiv');

  // Dispose of any existing chart to avoid duplicates
  if (this.root) {
    this.root.dispose();
  }  // Initialize new chart instance
  this.root = am5.Root.new(chartDiv);
this.root.setThemes([am5themes_Animated.new(this.root)]);

// Remove amCharts watermark (logo)
this.root._logo?.dispose();

  let chart = this.root.container.children.push(
    am5radar.RadarChart.new(this.root, { panX: false, panY: false, startAngle: -90, endAngle: 270 })
  );

    // Debugging: Check elements
    // chart.children.each((child) => console.log(child));

    let axisRenderer = am5radar.AxisRendererCircular.new(this.root, {
      strokeOpacity: 1,
      strokeWidth: 5,
      minGridDistance: 10
    });

    axisRenderer.ticks.template.setAll({ forceHidden: true, visible: false });
    axisRenderer.grid.template.setAll({ forceHidden: true, visible: true });
    axisRenderer.labels.template.setAll({ forceHidden: true, visible: true });

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(this.root, { min: 0, max: 360, strictMinMax: true, renderer: axisRenderer })
    );

    let createClockHand = (value: number, rotation: number, color?: number) => {
      let axisDataItem = xAxis.makeDataItem({ value });
      let clockHand = am5radar.ClockHand.new(this.root, { pinRadius: 0, radius: am5.percent(90), bottomWidth: 10 });

      if (color) clockHand.hand.set('fill', am5.color(color));

      clockHand.adapters.add('rotation', () => rotation);
      axisDataItem.set('bullet', am5xy.AxisBullet.new(this.root, { sprite: clockHand }));
      xAxis.createAxisRange(axisDataItem);
      return axisDataItem;
    };

    let axisDataItemN = createClockHand(0, -90, 0xff0000);
    let axisDataItemS = createClockHand(180, 90);

    let createLabel = (text: string, value: number, tickOpacity: number) => {
      let axisDataItem = xAxis.makeDataItem({ value });
      xAxis.createAxisRange(axisDataItem);

      let label = axisDataItem.get('label');
      if (label) {
        label.setAll({ text, fill: am5.color(0xffffff), forceHidden: false, inside: true, fontSize:8 });
      }

      axisRenderer.setAll({
        stroke: am5.color(0xffffff), // Fixed typo: "0xfffffff" to "0xffffff"
        strokeOpacity: 1,
        strokeWidth: 5,
        minGridDistance: 5,
      });

      let axis = axisDataItem.get('tick');
      if (axis) {
        axis.setAll({
          forceHidden: false,
          fill: am5.color(0xfffffff),
          strokeOpacity: tickOpacity,
          length: 12 * tickOpacity,
          visible: true,
          inside: true
        });
      }
    };

    // Add Direction Labels (N, NE, E, etc.)
    ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].forEach((dir, i) => createLabel(dir, i * 45, 1));
    for (let i = 0; i < 360; i += 5) createLabel('', i, 0.5);

    // Animate Radar Chart and Hands
    setInterval(() => {
      let newAngle = Math.random() * 360;
      chart.animate({ key: 'startAngle', to: newAngle, duration: 1000, easing: am5.ease.out(am5.ease.cubic) });
      chart.animate({ key: 'endAngle', to: newAngle + 360, duration: 1000, easing: am5.ease.out(am5.ease.cubic) });
      axisDataItemN.animate({ key: 'value', to: am5.math.normalizeAngle(-90 - newAngle), duration: 1000, easing: am5.ease.out(am5.ease.cubic) });
      axisDataItemS.animate({ key: 'value', to: am5.math.normalizeAngle(90 - newAngle), duration: 1000, easing: am5.ease.out(am5.ease.cubic) });
    }, 2000);
  }

  // ngOnDestroy(): void {
  //   if (this.root) {
  //     this.root.container.children.clear(); // Ensures all elements are cleared
  //     this.root.dispose();
  //   }
  // }
}
