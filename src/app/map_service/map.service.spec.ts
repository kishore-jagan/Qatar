import { TestBed } from '@angular/core/testing';

import { MapService1 } from './map.service';

describe('MapService', () => {
  let service: MapService1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
