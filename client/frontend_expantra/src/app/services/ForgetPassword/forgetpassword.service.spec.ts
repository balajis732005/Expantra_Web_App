import { TestBed } from '@angular/core/testing';

import { ForgetPasswordService } from './forgetpassword.service';

describe('ForgetPasswordService', () => {
  let service: ForgetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
