import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterManagerComponent } from './enter-manager.component';

describe('EnterManagerComponent', () => {
  let component: EnterManagerComponent;
  let fixture: ComponentFixture<EnterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
