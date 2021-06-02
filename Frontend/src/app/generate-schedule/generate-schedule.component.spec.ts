import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateScheduleComponent } from './generate-schedule.component';

describe('GenerateScheduleComponent', () => {
  let component: GenerateScheduleComponent;
  let fixture: ComponentFixture<GenerateScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
