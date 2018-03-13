import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanProfileComponent } from './scan-profile.component';

describe('ScanProfileComponent', () => {
  let component: ScanProfileComponent;
  let fixture: ComponentFixture<ScanProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
