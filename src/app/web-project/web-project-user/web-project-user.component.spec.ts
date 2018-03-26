import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProjectUserComponent } from './web-project-user.component';

describe('WebProjectUserComponent', () => {
  let component: WebProjectUserComponent;
  let fixture: ComponentFixture<WebProjectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebProjectUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebProjectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
