import { TestBed } from '@angular/core/testing';

import { ReportRequestsService } from './report-requests.service';

describe('ReportRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportRequestsService = TestBed.get(ReportRequestsService);
    expect(service).toBeTruthy();
  });
});
