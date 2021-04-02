import { TestBed } from '@angular/core/testing';

import { PlayerbookingService } from './playerbooking.service';

describe('PlayerbookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerbookingService = TestBed.get(PlayerbookingService);
    expect(service).toBeTruthy();
  });
});
