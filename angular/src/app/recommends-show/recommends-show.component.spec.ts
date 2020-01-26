import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendsShowComponent } from './recommends-show.component';

describe('RecommendsShowComponent', () => {
  let component: RecommendsShowComponent;
  let fixture: ComponentFixture<RecommendsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
