import { TestBed } from '@angular/core/testing';

import { AdminSrviceService } from './admin-srvice.service';

describe('AdminSrviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSrviceService = TestBed.get(AdminSrviceService);
    expect(service).toBeTruthy();
  });
});
