import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialGaugeComponent } from './radial-guage.component';

describe('RadialGuageComponent', () => {
  let component: RadialGaugeComponent;
  let fixture: ComponentFixture<RadialGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadialGaugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadialGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
