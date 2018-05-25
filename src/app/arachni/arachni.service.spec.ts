import { TestBed, inject } from '@angular/core/testing';

import { ArachniService } from './arachni.service';

describe('ArachniService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArachniService]
    });
  });

  it('should be created', inject([ArachniService], (service: ArachniService) => {
    expect(service).toBeTruthy();
  }));
});
