import { TestBed } from '@angular/core/testing';

import { HappyFeatureService } from './happy-feature.service';

describe('HappyFeatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappyFeatureService = TestBed.get(HappyFeatureService);
    expect(service).toBeTruthy();
  });
});
