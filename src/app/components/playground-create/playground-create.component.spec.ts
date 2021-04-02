import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundCreateComponent } from './playground-create.component';

describe('PlaygroundCreateComponent', () => {
  let component: PlaygroundCreateComponent;
  let fixture: ComponentFixture<PlaygroundCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaygroundCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
