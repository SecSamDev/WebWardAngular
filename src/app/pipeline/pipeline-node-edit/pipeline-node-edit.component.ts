import { Component, OnInit,Input } from '@angular/core';
import {PipelineNode} from '../node'
@Component({
  selector: 'pipeline-node-edit',
  templateUrl: './pipeline-node-edit.component.html',
  styleUrls: ['./pipeline-node-edit.component.css']
})
/**
 * For editing a PipelineNode
 */
export class PipelineNodeEditComponent implements OnInit {
  @Input() node : PipelineNode;
  constructor() { }

  ngOnInit() {
  }

}
