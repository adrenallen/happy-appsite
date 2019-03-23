import { TestBed } from '@angular/core/testing';

import { FactorsService } from './factors.service';

describe('FactorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactorsService = TestBed.get(FactorsService);
    expect(service).toBeTruthy();
  });
});
