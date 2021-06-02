import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProgressComponent } from './player-progress.component';

describe('PlayerProgressComponent', () => {
  let component: PlayerProgressComponent;
  let fixture: ComponentFixture<PlayerProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
