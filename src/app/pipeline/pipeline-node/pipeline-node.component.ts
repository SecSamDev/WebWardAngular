import { Component, OnInit,Input,Output, EventEmitter,ElementRef } from '@angular/core';
import {PipelineNode,PipelineNodeAtribute} from '../node';
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
  @Input() node : PipelineNode;
  @Output() nodeClicked = new EventEmitter<PipelineNode>();
  constructor(private el: ElementRef) {
    
  }

  ngOnInit() {
  }


  selectElement(){
    console.log("Clicked " + this.node.name)
    this.nodeClicked.emit(this.node);
    console.log(this.node.outputConectors)
  }

}

