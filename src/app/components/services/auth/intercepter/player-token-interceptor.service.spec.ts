import { TestBed } from '@angular/core/testing';

import { PlayerTokenInterceptorService } from './player-token-interceptor.service';

describe('PlayerTokenInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerTokenInterceptorService = TestBed.get(PlayerTokenInterceptorService);
    expect(service).toBeTruthy();
  });
});
