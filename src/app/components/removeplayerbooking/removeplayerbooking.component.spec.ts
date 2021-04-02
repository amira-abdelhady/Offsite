import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveplayerbookingComponent } from './removeplayerbooking.component';

describe('RemoveplayerbookingComponent', () => {
  let component: RemoveplayerbookingComponent;
  let fixture: ComponentFixture<RemoveplayerbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveplayerbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveplayerbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
