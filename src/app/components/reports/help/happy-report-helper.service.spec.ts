import { TestBed } from '@angular/core/testing';

import { HappyReportHelperService } from './happy-report-helper.service';

describe('HappyReportHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappyReportHelperService = TestBed.get(HappyReportHelperService);
    expect(service).toBeTruthy();
  });
});
