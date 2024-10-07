import { TestBed } from '@angular/core/testing';

import { EpfService } from './epf.service';

describe('EpfService', () => {
  let service: EpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
