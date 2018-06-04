import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullViewArachniComponent } from './full-view-arachni.component';

describe('FullViewArachniComponent', () => {
  let component: FullViewArachniComponent;
  let fixture: ComponentFixture<FullViewArachniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullViewArachniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullViewArachniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
