import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindGaugeComponent } from './wind-gauge.component';

describe('WindGaugeComponent', () => {
  let component: WindGaugeComponent;
  let fixture: ComponentFixture<WindGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindGaugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
