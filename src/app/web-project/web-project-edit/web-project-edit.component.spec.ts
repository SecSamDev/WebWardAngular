import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProjectEditComponent } from './web-project-edit.component';

describe('WebProjectEditComponent', () => {
  let component: WebProjectEditComponent;
  let fixture: ComponentFixture<WebProjectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebProjectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
