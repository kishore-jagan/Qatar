import { TestBed } from '@angular/core/testing';

import { StationconfigService } from './stationconfig.service';

describe('StationconfigService', () => {
  let service: StationconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
