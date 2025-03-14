import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Direction2Component } from './direction2.component';

describe('Direction2Component', () => {
  let component: Direction2Component;
  let fixture: ComponentFixture<Direction2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Direction2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Direction2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
