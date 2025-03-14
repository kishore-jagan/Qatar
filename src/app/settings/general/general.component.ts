import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RadialGaugeComponent } from "../../widgets/radial-guage/radial-guage.component";
import { Direction1Component } from "../../widgets/direction1/direction1.component";
import { Gauge2Component } from "../../widgets/gauge2/gauge2.component";
// import { RadialGaugeComponent } from "../../widgets/radial-guage/radial-guage.component";

@Component({
  selector: 'app-general',
  standalone:true,
  imports: [CommonModule, RadialGaugeComponent, Direction1Component, Gauge2Component],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {
  selectedCurrent: string = 'guage1';
  selectedtide:string = 'tide1';
  selectedbattery:string = 'battery1'

  changeCurrent(name: string) {
    this.selectedCurrent = name;
  }
  changetide(name:string){
    this.selectedtide = name
  }
  changebattery(name:string){
    this.selectedbattery = name
  }
}
