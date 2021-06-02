import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOpponentMatchComponent } from './custom-opponent-match.component';

describe('CustomOpponentMatchComponent', () => {
  let component: CustomOpponentMatchComponent;
  let fixture: ComponentFixture<CustomOpponentMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomOpponentMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOpponentMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
