import { TestBed, inject } from '@angular/core/testing';

import { GsmService } from './gsm.service';

describe('GsmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GsmService]
    });
  });

  it('should be created', inject([GsmService], (service: GsmService) => {
    expect(service).toBeTruthy();
  }));
});
