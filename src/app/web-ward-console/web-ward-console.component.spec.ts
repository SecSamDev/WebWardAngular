import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebWardConsoleComponent } from './web-ward-console.component';

describe('WebWardConsoleComponent', () => {
  let component: WebWardConsoleComponent;
  let fixture: ComponentFixture<WebWardConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebWardConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebWardConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
