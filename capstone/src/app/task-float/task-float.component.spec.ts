import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFloatComponent } from './task-float.component';

describe('TaskFloatComponent', () => {
  let component: TaskFloatComponent;
  let fixture: ComponentFixture<TaskFloatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFloatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
