import { TestBed } from '@angular/core/testing';

import { HappySecurityService } from './happy-security.service';

describe('HappySecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappySecurityService = TestBed.get(HappySecurityService);
    expect(service).toBeTruthy();
  });
});
