import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarHomeComponent } from './radar-home.component';

describe('RadarHomeComponent', () => {
  let component: RadarHomeComponent;
  let fixture: ComponentFixture<RadarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
