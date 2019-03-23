import { TestBed } from '@angular/core/testing';

import { HappyDialogService } from './happy-dialog.service';

describe('HappyDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappyDialogService = TestBed.get(HappyDialogService);
    expect(service).toBeTruthy();
  });
});
