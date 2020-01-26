import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobToCheckComponent } from './job-to-check.component';

describe('JobToCheckComponent', () => {
  let component: JobToCheckComponent;
  let fixture: ComponentFixture<JobToCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobToCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobToCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
