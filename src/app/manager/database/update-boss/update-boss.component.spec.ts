import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBossComponent } from './update-boss.component';

describe('UpdateBossComponent', () => {
  let component: UpdateBossComponent;
  let fixture: ComponentFixture<UpdateBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
