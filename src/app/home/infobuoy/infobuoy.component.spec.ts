import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobuoyComponent } from './infobuoy.component';

describe('InfobuoyComponent', () => {
  let component: InfobuoyComponent;
  let fixture: ComponentFixture<InfobuoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfobuoyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfobuoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
