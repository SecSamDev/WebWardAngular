import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode, PipelineService } from '../../../pipeline/index'
import { AlertService } from '../../../alert/alert.service'
import { TypeComponent } from '../../type.component'
import { PLATFORM_LIST } from './pltaforms'

@Component({
  selector: 'type-arach-platforms',
  templateUrl: './arach-platforms-type.component.html',
  styleUrls: ['./arach-platforms-type.component.css']
})
export class ArachPlatformsTypeComponent implements OnInit, TypeComponent {
  private _param: PipelineNodeAtribute = new PipelineNodeAtribute();
  private list: string[] = [];
  private platformList = [];
  @Input() node: PipelineNode;

  @Input() set param(prm) {
    this._param = prm;
    try {
      let obj = prm.value.split(',')
      if(obj.length > 0)
        this.list = obj;
    } catch (err) {
      try {
        prm.value = "";
      } catch (err2) { }
    }
  };
  get param() {
    return this._param;
  }

  constructor(private pipService: PipelineService, private alert: AlertService) { }

  ngOnInit() {
    let keys = Object.keys(PLATFORM_LIST);
    for(let i = 0; i< keys.length; i++){
      this.platformList.push({"name" : keys[i], "description" : PLATFORM_LIST[keys[i]]})
    }
  }
  save() {
    try {
      this._param.value = this.list.join(',');
      this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
        this.alert.success("Arachni Platforms saved")
      }, err => {
        this.alert.error("Cannot save platforms")
      })
    } catch (err) { }
  }
  delete() {
    this.list = [];
    this.save();
  }
  addPlatform(platf : string){
    if(!this.list.find((val,i,ob)=>{
      if(val === platf){
        return true;
      }
      return false;
    })){
      this.list.push(platf)
    }
  }

}
