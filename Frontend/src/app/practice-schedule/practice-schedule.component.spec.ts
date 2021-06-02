import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeScheduleComponent } from './practice-schedule.component';

describe('PracticeScheduleComponent', () => {
  let component: PracticeScheduleComponent;
  let fixture: ComponentFixture<PracticeScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
