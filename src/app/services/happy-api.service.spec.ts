import { TestBed } from '@angular/core/testing';

import { HappyApiService } from './happy-api.service';

describe('HappyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappyApiService = TestBed.get(HappyApiService);
    expect(service).toBeTruthy();
  });
});
