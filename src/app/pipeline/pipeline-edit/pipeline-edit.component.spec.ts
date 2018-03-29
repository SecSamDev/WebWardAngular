import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineEditComponent } from './pipeline-edit.component';

describe('PipelineEditComponent', () => {
  let component: PipelineEditComponent;
  let fixture: ComponentFixture<PipelineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
