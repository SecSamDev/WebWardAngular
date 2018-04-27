import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WebhookService, WebHook } from '../../webhook/index';
import { PipelineNodeAtribute, PipelineNode,PipelineService } from '../../pipeline/index'
import { AlertService } from '../../alert/alert.service'
import { TypeComponent } from '../type.component'

@Component({
  selector: 'type-object',
  templateUrl: './object-type.component.html',
  styleUrls: ['./object-type.component.css']
})
export class ObjectTypeComponent implements OnInit, TypeComponent {
  private _param : PipelineNodeAtribute = new PipelineNodeAtribute();
  @Input() node: PipelineNode;

  @Input() set param(prm){
    Object.assign(this._param,prm);
    this._param.value = JSON.stringify(prm.value);
  };
  get param(){
    return this._param;
  }

  constructor(private pipService : PipelineService,private alert : AlertService) { }

  ngOnInit() {
   
  }
  save() {
    this.pipService.updateNodeForPipeline(this.node).subscribe((data)=>{
      this.alert.success("Propertie: " + this.param.name + " saved")
    },err=>{
      this.alert.error("Cannot save propertie: " +this.param.name)
    })
  }
  delete() {
    
  }

}
