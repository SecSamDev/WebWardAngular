import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode } from '../pipeline/node';
import { TypesDirective } from './types.directive';
import { WebhookTypeComponent } from './webhook/webhook-type.component'
import { DefaultTypeComponent } from './default/default-type.component';
import { ArrayTypeComponent } from './array/array-type.component';
import { DaysTypeComponent } from './days/days-type.component';
import { TimeTypeComponent } from './time/time-type.component';
import { TypeComponent } from './type.component';

@Component({
  selector: 'node-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {
  @Input() set node(node: PipelineNode) {
    this._node = node;
    this.properties = node.properties;
    this.errParams = node.errorParams;
    this.outParams = node.outputParams;
    if (this.properties.length > 0) {
      this.selectParam(this.properties[0])
    } else if (this.errParams.length > 0) {
      this.selectParam(this.errParams[0])
    } else if (this.outParams.length > 0) {
      this.selectParam(this.outParams[0])
    }
  }
  get node(): PipelineNode {
    return this._node;
  }
  selectedParam: PipelineNodeAtribute = new PipelineNodeAtribute();
  _node: PipelineNode;
  properties: PipelineNodeAtribute[];
  errParams: PipelineNodeAtribute[];
  outParams: PipelineNodeAtribute[];

  @ViewChild(TypesDirective) nodeTypes: TypesDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  selectParam(param: PipelineNodeAtribute) {
    if (param) {
      this.selectedParam = param;
      this.loadComponent();
    } else {
      this.loadComponent();
    }
  }
  ngOnInit() {
  }
  addPropertie(){
    let propertie = new PipelineNodeAtribute();
    propertie.name = "Propertie n" + this.properties.length;
    propertie.value = "";
    let pos = this.properties.push(propertie)
    this.selectedParam = this.properties[pos-1]
  }
  addErrParameter(){
    let propertie = new PipelineNodeAtribute();
    propertie.name = "Error Parameter n" + this.errParams.length;
    propertie.value = "";
    let pos =this.errParams.push(propertie)
    this.selectedParam = this.errParams[pos-1]
  }
  addOutParameter(){
    let propertie = new PipelineNodeAtribute();
    propertie.name = "Output Parameter n" + this.outParams.length;
    propertie.value = "";
    let pos =this.outParams.push(propertie)
    this.selectedParam = this.outParams[pos-1]
  }

  loadComponent() {
    let comp;
    switch (this.selectedParam.type) {
      case 'WEBHOOK':
        comp = WebhookTypeComponent;
        break;
      case 'DAYS_PICKER':
        comp = DaysTypeComponent;
        break;
      case 'ARRAY':
        comp = ArrayTypeComponent;
        break;
      case 'TIME':
        comp = TimeTypeComponent;
        break;
      default:
        comp = DefaultTypeComponent;
        break;
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);

    let viewContainerRef = this.nodeTypes.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<TypeComponent>(componentRef.instance)).node = this._node;
    (<TypeComponent>(componentRef.instance)).param = this.selectedParam;
  }
}
