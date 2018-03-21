import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanCheckEditComponent } from './scan-check-edit.component';

describe('ScanCheckEditComponent', () => {
  let component: ScanCheckEditComponent;
  let fixture: ComponentFixture<ScanCheckEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanCheckEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanCheckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
