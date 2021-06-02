import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePriorityComponent } from './attendance-priority.component';

describe('AttendancePriorityComponent', () => {
  let component: AttendancePriorityComponent;
  let fixture: ComponentFixture<AttendancePriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancePriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
