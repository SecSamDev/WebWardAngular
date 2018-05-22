import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WebhookService, WebHook } from '../../webhook/index';
import { PipelineNodeAtribute, PipelineNode, PipelineService } from '../../pipeline/index'
import { AlertService } from '../../alert/alert.service'
import { TypeComponent } from '../type.component'

@Component({
  selector: 'type-hash-object',
  templateUrl: './hash-object-type.component.html',
  styleUrls: ['./hash-object-type.component.css']
})
export class HashObjectTypeComponent implements OnInit, TypeComponent {
  private _param: PipelineNodeAtribute = new PipelineNodeAtribute();
  private array_names: string[] = [];
  private array_values: string[] = [];
  @Input() node: PipelineNode;

  @Input() set param(prm) {
    this._param = prm
    let paramObject = {};
    try {
      let keys = [];
      if (typeof prm.value === 'string') {
        paramObject = JSON.parse(prm.value);
        keys = Object.keys(paramObject);
      }
      else {
        paramObject = prm.value
        keys = Object.keys(paramObject);
      }
      let val = "";
      for (let i = 0; i < keys.length; i++) {
        this.addRow(keys[i], paramObject[keys[i]])
      }
      this._param.decoratorValue = this.getDecoratorValue();
    } catch (err) { }

  };
  get param() {
    return this._param;
  }

  constructor(private pipService: PipelineService, private alert: AlertService) { }

  ngOnInit() {

  }
  save() {
    this._param.decoratorValue = this.getDecoratorValue();
    this._param.value = JSON.stringify(this.getValue());
    this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
      this.alert.success("Propertie: " + this.param.name + " saved")
    }, err => {
      this.alert.error("Cannot save propertie: " + this.param.name)
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
  addRow(name = `_${this.array_names.length}`, val = `_${this.array_values.length}`) {
    this.array_names.push(name)
    this.array_values.push(val)
  }
  removeRow(pos: number = 0) {
    this.array_names.splice(pos, 1)
    this.array_values.splice(pos, 1)
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  getDecoratorValue() {
    let val = "";
    for (let i = 0; i < this.array_names.length; i++) {
      val += this.array_names[i] + " => " + this.array_values[i] + "\n"
    }
    return val
  }
  getValue() {
    let val = {};
    for (let i = 0; i < this.array_names.length; i++) {
      val[this.array_names[i]] = this.array_values[i]
    }
    return val;
  }

}
