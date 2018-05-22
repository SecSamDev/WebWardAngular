import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WebhookService, WebHook } from '../../webhook/index';
import { PipelineNodeAtribute, PipelineNode,PipelineService } from '../../pipeline/index'
import { AlertService } from '../../alert/alert.service'
import { TypeComponent } from '../type.component'

@Component({
  selector: 'type-default',
  templateUrl: './default-type.component.html',
  styleUrls: ['./default-type.component.css']
})
export class DefaultTypeComponent implements OnInit, TypeComponent {
  @Input() node: PipelineNode;
  @Input() param: PipelineNodeAtribute;

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
    this.node.removeParam(this.param)
    this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
        this.alert.success("Propertie removed")
    }, err => {
        this.alert.error("Cannot remove propertie")
    })
}

}
