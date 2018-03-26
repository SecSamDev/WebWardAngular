import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProjectPageComponent } from './web-project-page.component';

describe('WebProjectPageComponent', () => {
  let component: WebProjectPageComponent;
  let fixture: ComponentFixture<WebProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebProjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
