import { TestBed } from '@angular/core/testing';

import { PartecipantiService } from './partecipanti.service';

describe('PartecipantiService', () => {
  let service: PartecipantiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartecipantiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
