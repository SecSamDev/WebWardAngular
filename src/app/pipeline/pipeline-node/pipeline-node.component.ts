import { Component, OnInit,Input } from '@angular/core';
import {PipelineNode,PipelineNodeAtribute} from './node';
@Component({
  selector: 'pipeline-node',
  templateUrl: './pipeline-node.component.html',
  styleUrls: ['./pipeline-node.component.css']
})
export class PipelineNodeComponent implements OnInit {
  @Input() node : PipelineNode;
  constructor() { }

  ngOnInit() {
  }

}
