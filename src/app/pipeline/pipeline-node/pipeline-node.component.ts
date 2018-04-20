import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { PipelineNode, PipelineNodeAtribute } from '../node';
@Component({
  selector: '[pipeline-node]',
  templateUrl: './pipeline-node.component.html',
  styleUrls: ['./pipeline-node.component.css']
})
/**
 * SVG Component.
 * Use this component as: 
 * <svg:g pipeline-node  [node]="node"/>
 */
export class PipelineNodeComponent implements OnInit {
  private _node: PipelineNode;
  private statusColor = "green";
  private showProperties : PipelineNodeAtribute[] = [];
  private subscription;
  @Output() nodeClicked = new EventEmitter<PipelineNode>();
  @Input() set node(node: PipelineNode) {
    if (this.subscription)
      this._node.subscriptor.unsubscribe();
    this._node = node;
    this.setColor();
    this.setProperties();
    this.subscription = this._node.subscriptor.subscribe(() => {
      this.setColor();
    })

  }
  get node(): PipelineNode {
    return this._node;
  }
  constructor(private el: ElementRef) {

  }
  setColor(){
    switch (this._node.status) {
      case 0:
        this.statusColor = "white";
        break;
      case 1:
        this.statusColor = "blue";
        break;
      case 2:
        this.statusColor = "green";
        break;
      case 3:
        this.statusColor = "red";
        break;
      case 4:
        this.statusColor = "black";
        break;
    }
  }

  ngOnInit() {
  }
  setProperties(){
    let showProp : PipelineNodeAtribute;
    if((showProp = this._node.properties.find((val,i,arr)=>{
      if(val.name === '_SHOW'){
        return true;
      }else{
        return false;
      }
    }))){
      let propNames = showProp.value.split(',');
      for(let searchPropertie of propNames){
        let foundPropertie : PipelineNodeAtribute;
        if((foundPropertie = this._node.properties.find((val,i,arr)=>{
          if(val.name === searchPropertie){
            return true;
          }else{
            return false;
          }
        }))){
          this.showProperties.push(foundPropertie);
        }
      }
    }
  }

  selectElement() {
    this.nodeClicked.emit(this.node);
  }

}

