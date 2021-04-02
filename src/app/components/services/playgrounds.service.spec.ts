import { TestBed } from '@angular/core/testing';

import { PlaygroundsService } from './playgrounds.service';

describe('PlaygroundsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaygroundsService = TestBed.get(PlaygroundsService);
    expect(service).toBeTruthy();
  });
});
