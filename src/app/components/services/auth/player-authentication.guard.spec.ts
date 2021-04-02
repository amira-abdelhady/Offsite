import { TestBed, async, inject } from '@angular/core/testing';

import { PlayerAuthenticationGuard } from './player-authentication.guard';

describe('PlayerAuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerAuthenticationGuard]
    });
  });

  it('should ...', inject([PlayerAuthenticationGuard], (guard: PlayerAuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
