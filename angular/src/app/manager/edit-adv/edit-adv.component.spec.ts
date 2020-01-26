import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvComponent } from './edit-adv.component';

describe('EditAdvComponent', () => {
  let component: EditAdvComponent;
  let fixture: ComponentFixture<EditAdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
