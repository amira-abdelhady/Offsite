import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundsDetailsComponent } from './playgrounds-details.component';

describe('PlaygroundsDetailsComponent', () => {
  let component: PlaygroundsDetailsComponent;
  let fixture: ComponentFixture<PlaygroundsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaygroundsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
