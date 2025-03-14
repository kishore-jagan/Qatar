import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BuoyService } from '../infobuoy/buoy.service';

@Component({
  selector: 'app-infobuoy',
  standalone: true,
  imports: [],
  templateUrl: './infobuoy.component.html',
  styleUrl: './infobuoy.component.css',
})
export class InfobuoyComponent implements OnInit {
  @Input() buoyName!: string;
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() status!: string;

  private buoyClickedSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.buoyClickedSubscription = this.buoyService.buoyClicked$.subscribe(
      (buoyName) => {
        if (buoyName === this.buoyName) {
          this.rotateStation();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.buoyClickedSubscription.unsubscribe();
  }

  rotateStation() {
    const stationnameElement =
      this.el.nativeElement.querySelector('.stationname');
    if (stationnameElement.classList.contains('rotated')) {
      this.renderer.removeClass(stationnameElement, 'rotated');
    } else {
      this.renderer.addClass(stationnameElement, 'rotated');
    }
  }

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private buoyService: BuoyService
  ) {}
}
