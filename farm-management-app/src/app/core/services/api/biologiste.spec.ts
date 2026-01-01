import { TestBed } from '@angular/core/testing';

import { Biologiste } from './biologiste';

describe('Biologiste', () => {
  let service: Biologiste;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Biologiste);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
