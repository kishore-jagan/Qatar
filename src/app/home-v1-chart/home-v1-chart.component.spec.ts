import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeV1ChartComponent } from './home-v1-chart.component';

describe('HomeV1ChartComponent', () => {
  let component: HomeV1ChartComponent;
  let fixture: ComponentFixture<HomeV1ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeV1ChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeV1ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
