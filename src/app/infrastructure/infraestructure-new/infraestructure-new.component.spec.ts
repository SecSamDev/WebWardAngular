import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructureNewComponent } from './infraestructure-new.component';

describe('InfraestructureNewComponent', () => {
  let component: InfraestructureNewComponent;
  let fixture: ComponentFixture<InfraestructureNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraestructureNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraestructureNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
