import { TestBed } from '@angular/core/testing';

import { HappyIconService } from './happy-icon.service';

describe('HappyIconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappyIconService = TestBed.get(HappyIconService);
    expect(service).toBeTruthy();
  });
});
