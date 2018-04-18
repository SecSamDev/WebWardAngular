import { Component, OnInit, Input } from '@angular/core';
import { Pipeline } from '../pipeline'
import { PipelineService } from '../pipeline.service';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'pipeline-edit',
  templateUrl: './pipeline-edit.component.html',
  styleUrls: ['./pipeline-edit.component.css']
})
export class PipelineEditComponent implements OnInit {
  private _pipeline: Pipeline;
  private _pipelineCopy: Pipeline;
  @Input() set pipeline(pipe: Pipeline) {
    this._pipeline = pipe;
    this._pipelineCopy = Object.assign({}, pipe);
  }
  get pipeline() {
    return this._pipeline;
  }
  constructor(private pipService: PipelineService, private modalService: NgbModal,
    public activeModal: NgbActiveModal, private alert: AlertService) { }

  ngOnInit() {
  }
  save() {
    this.pipService.updatePipeline(this._pipeline).subscribe((data) => {
      this.alert.success('Pipeline Updated');
    }, err => {
      this.alert.error('Cant update pipeline');
    })
  }
  cancel() {
    Object.assign(this._pipeline, this._pipelineCopy);
  }
  delete() {
    this.pipService.deletePipeline(this._pipeline).subscribe((data) => {
      this.alert.success('Pipeline Deleted');
    }, err => {
      this.alert.error('Cant delete pipeline');
    })
  }

}
