import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSessionsComponent } from './match-sessions.component';

describe('MatchSessionsComponent', () => {
  let component: MatchSessionsComponent;
  let fixture: ComponentFixture<MatchSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
