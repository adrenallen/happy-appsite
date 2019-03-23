import { TestBed } from '@angular/core/testing';

import { HappySupportService } from './happy-support.service';

describe('HappySupportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappySupportService = TestBed.get(HappySupportService);
    expect(service).toBeTruthy();
  });
});
