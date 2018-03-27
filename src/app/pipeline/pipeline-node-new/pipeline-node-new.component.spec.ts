import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineNodeNewComponent } from './pipeline-node-new.component';

describe('PipelineNodeNewComponent', () => {
  let component: PipelineNodeNewComponent;
  let fixture: ComponentFixture<PipelineNodeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineNodeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineNodeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
