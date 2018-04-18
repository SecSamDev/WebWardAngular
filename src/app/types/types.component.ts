import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode } from '../pipeline/node';
import { TypesDirective } from './types.directive';
import { WebhookTypeComponent } from './webhook/webhook-type.component'
import { DefaultTypeComponent } from './default/default-type.component'
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
    if(this.properties.length > 0){
      this.selectParam(this.properties[0])
    }else if(this.errParams.length > 0){
      this.selectParam(this.errParams[0])
    }else if(this.outParams.length > 0){
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
    if(param){
      this.selectedParam = param;
      this.loadComponent();
    }else{
      this.loadComponent();
    }
  }
  ngOnInit() {
  }

  loadComponent() {
    let comp;
    switch (this.selectedParam.type) {
      case 'WEBHOOK':
        comp = WebhookTypeComponent;
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
