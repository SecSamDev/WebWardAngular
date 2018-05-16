import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArachniComponent } from './arachni.component';

describe('ArachniComponent', () => {
  let component: ArachniComponent;
  let fixture: ComponentFixture<ArachniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArachniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArachniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
