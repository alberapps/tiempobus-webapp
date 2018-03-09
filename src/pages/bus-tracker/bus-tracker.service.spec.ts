import { TestBed, inject } from '@angular/core/testing';

import { BusTrackerService } from './bus-tracker.service';

describe('BusTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusTrackerService]
    });
  });

  it('should be created', inject([BusTrackerService], (service: BusTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
