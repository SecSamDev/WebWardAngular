import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanCheckNewComponent } from './scan-check-new.component';

describe('ScanCheckNewComponent', () => {
  let component: ScanCheckNewComponent;
  let fixture: ComponentFixture<ScanCheckNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanCheckNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanCheckNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
