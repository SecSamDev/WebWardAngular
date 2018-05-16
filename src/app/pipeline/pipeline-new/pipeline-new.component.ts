import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Pipeline} from '../pipeline';
import {PipelineService} from '../pipeline.service';
import {AlertService} from '../../alert/alert.service'

/**
 * With this component we can create a new Pipeline
 */
@Component({
  selector: 'pipeline-new',
  templateUrl: './pipeline-new.component.html',
  styleUrls: ['./pipeline-new.component.css']
})
export class PipelineNewComponent implements OnInit {
  @Input()pipe : Pipeline;
  @Output() completed = new EventEmitter<Pipeline>();
  constructor(private pipService  : PipelineService,private alertService : AlertService) {}

  ngOnInit() {
  }
  save(){
    this.pipe.status = 5;
    this.pipService.createPipeline(this.pipe).subscribe((data)=>{
      this.alertService.success('Suscessfully saved pipeline')
      return data;
    },err=>{
      this.alertService.warn('message' in err.error ? err.error.message : 'Cant save Pipeline')
    });
  }
  cancel(){
    this.pipe = null;
  }

}
