import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WwmodulesComponent } from './wwmodules.component';

describe('WwmodulesComponent', () => {
  let component: WwmodulesComponent;
  let fixture: ComponentFixture<WwmodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WwmodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WwmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
