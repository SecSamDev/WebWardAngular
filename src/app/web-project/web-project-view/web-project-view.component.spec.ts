import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProjectViewComponent } from './web-project-view.component';

describe('WebProjectViewComponent', () => {
  let component: WebProjectViewComponent;
  let fixture: ComponentFixture<WebProjectViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebProjectViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
