import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOneJobComponent } from './show-one-job.component';

describe('ShowOneJobComponent', () => {
  let component: ShowOneJobComponent;
  let fixture: ComponentFixture<ShowOneJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOneJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOneJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
