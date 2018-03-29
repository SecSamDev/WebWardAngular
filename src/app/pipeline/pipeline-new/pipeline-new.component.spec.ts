import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineNewComponent } from './pipeline-new.component';

describe('PipelineNewComponent', () => {
  let component: PipelineNewComponent;
  let fixture: ComponentFixture<PipelineNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
