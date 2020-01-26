import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvToSendComponent } from './cv-to-send.component';

describe('CvToSendComponent', () => {
  let component: CvToSendComponent;
  let fixture: ComponentFixture<CvToSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvToSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvToSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
