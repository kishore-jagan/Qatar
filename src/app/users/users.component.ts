import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';
import { BatteryComponent } from '../home/battery/battery.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [BatteryComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target && (event.target as HTMLElement).id === 'rotateButton') {
      this.renderer.addClass(
        this.el.nativeElement.querySelector('.stationname'),
        'rotated'
      );
    } else {
      this.renderer.removeClass(
        this.el.nativeElement.querySelector('.stationname'),
        'rotated'
      );
    }
  }
}
