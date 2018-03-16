import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWebProjectComponentComponent } from './dashboard-web-project-component.component';

describe('DashboardWebProjectComponentComponent', () => {
  let component: DashboardWebProjectComponentComponent;
  let fixture: ComponentFixture<DashboardWebProjectComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWebProjectComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWebProjectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
