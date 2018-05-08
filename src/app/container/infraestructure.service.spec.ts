import { TestBed, inject } from '@angular/core/testing';

import { InfraestructureService } from './infraestructure.service';

describe('InfraestructureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfraestructureService]
    });
  });

  it('should be created', inject([InfraestructureService], (service: InfraestructureService) => {
    expect(service).toBeTruthy();
  }));
});
