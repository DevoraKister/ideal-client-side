import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BossdetailsComponent } from './bossdetails.component';

describe('BossdetailsComponent', () => {
  let component: BossdetailsComponent;
  let fixture: ComponentFixture<BossdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BossdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BossdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
