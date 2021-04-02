import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPsssComponent } from './rest-psss.component';

describe('RestPsssComponent', () => {
  let component: RestPsssComponent;
  let fixture: ComponentFixture<RestPsssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestPsssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestPsssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
