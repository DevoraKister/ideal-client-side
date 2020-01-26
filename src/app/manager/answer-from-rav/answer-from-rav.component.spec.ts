import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerFromRavComponent } from './answer-from-rav.component';

describe('AnswerFromRavComponent', () => {
  let component: AnswerFromRavComponent;
  let fixture: ComponentFixture<AnswerFromRavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerFromRavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerFromRavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
