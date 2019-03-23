import { TestBed } from '@angular/core/testing';

import { HappyStringService } from './happy-string.service';

describe('HappyStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappyStringService = TestBed.get(HappyStringService);
    expect(service).toBeTruthy();
  });
});
