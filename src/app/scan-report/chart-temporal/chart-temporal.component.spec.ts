import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTemporalComponent } from './chart-temporal.component';

describe('ChartTemporalComponent', () => {
  let component: ChartTemporalComponent;
  let fixture: ComponentFixture<ChartTemporalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTemporalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
