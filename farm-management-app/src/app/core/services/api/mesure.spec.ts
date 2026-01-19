import { TestBed } from '@angular/core/testing';

import { Mesure } from './mesure';

describe('Mesure', () => {
  let service: Mesure;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mesure);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
