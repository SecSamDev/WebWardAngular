import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineNodeEditComponent } from './pipeline-node-edit.component';

describe('PipelineNodeEditComponent', () => {
  let component: PipelineNodeEditComponent;
  let fixture: ComponentFixture<PipelineNodeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineNodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineNodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
