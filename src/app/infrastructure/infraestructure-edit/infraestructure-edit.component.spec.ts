import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructureEditComponent } from './infraestructure-edit.component';

describe('InfraestructureEditComponent', () => {
  let component: InfraestructureEditComponent;
  let fixture: ComponentFixture<InfraestructureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraestructureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraestructureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
