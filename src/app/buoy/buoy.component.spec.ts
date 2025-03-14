import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuoyComponent } from './buoy.component';

describe('BuoyComponent', () => {
  let component: BuoyComponent;
  let fixture: ComponentFixture<BuoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuoyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
