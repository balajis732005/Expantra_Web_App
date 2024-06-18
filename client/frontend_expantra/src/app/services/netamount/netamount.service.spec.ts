import { TestBed } from '@angular/core/testing';

import { NetamountService } from './netamount.service';

describe('NetamountService', () => {
  let service: NetamountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetamountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
