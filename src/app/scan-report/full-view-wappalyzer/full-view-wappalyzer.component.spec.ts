import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullViewWappalyzerComponent } from './full-view-wappalyzer.component';

describe('FullViewWappalyzerComponent', () => {
  let component: FullViewWappalyzerComponent;
  let fixture: ComponentFixture<FullViewWappalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullViewWappalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullViewWappalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
